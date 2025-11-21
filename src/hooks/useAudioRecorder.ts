"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseAudioRecorderProps {
    stream: MediaStream | null;
    isCapturing: boolean;
    onTranscript: (text: string) => void;
}

export function useAudioRecorder({ stream, isCapturing, onTranscript }: UseAudioRecorderProps) {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const sendAudio = useCallback(async (blob: Blob) => {
        try {
            const formData = new FormData();
            formData.append("audio", blob);

            const res = await fetch("/api/transcribe", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                console.error("API Error:", res.status, res.statusText);
                const text = await res.text();
                console.error("API Response:", text);
                return;
            }

            const data = await res.json();
            console.log("API Success:", data);
            if (data.transcript) {
                onTranscript(data.transcript);
            }
        } catch (err) {
            console.error("Error sending audio:", err);
        }
    }, [onTranscript]);

    const stopRecording = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
    }, []);

    const startRecording = useCallback(() => {
        if (!stream) return;

        try {
            console.log("Starting recorder...");
            const startChunk = () => {
                if (mediaRecorderRef.current?.state === "recording") {
                    mediaRecorderRef.current.stop();
                }

                // Determine supported mime type
                const mimeType = [
                    "audio/webm;codecs=opus",
                    "audio/webm",
                    "audio/mp4",
                    "audio/ogg",
                    ""
                ].find(type => type === "" || MediaRecorder.isTypeSupported(type));

                console.log("Using mimeType:", mimeType || "default");

                const options = mimeType ? { mimeType } : undefined;

                // Create a new stream with ONLY audio tracks to avoid issues with video tracks from getDisplayMedia
                const audioTracks = stream.getAudioTracks();
                if (audioTracks.length === 0) {
                    console.error("No audio tracks available");
                    return;
                }
                const audioStream = new MediaStream(audioTracks);

                const recorder = new MediaRecorder(audioStream, options);

                mediaRecorderRef.current = recorder;

                const chunks: Blob[] = [];
                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };

                recorder.onstop = async () => {
                    const blob = new Blob(chunks, { type: mimeType || "audio/webm" });
                    console.log("Audio chunk recorded, size:", blob.size);
                    if (blob.size > 0) {
                        await sendAudio(blob);
                    }
                };

                recorder.start();
            };

            startChunk();

            intervalRef.current = setInterval(() => {
                startChunk();
            }, 5000);

        } catch (err) {
            console.error("Error starting recorder:", err);
        }
    }, [stream, sendAudio]);

    useEffect(() => {
        if (isCapturing && stream) {
            startRecording();
        } else {
            stopRecording();
        }

        return () => {
            stopRecording();
        };
    }, [isCapturing, stream, startRecording, stopRecording]);
}
