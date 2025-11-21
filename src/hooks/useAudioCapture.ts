"use client";

import { useState, useCallback, useEffect } from "react";

interface AudioCaptureState {
    stream: MediaStream | null;
    isCapturing: boolean;
    error: string | null;
}

export function useAudioCapture() {
    const [state, setState] = useState<AudioCaptureState>({
        stream: null,
        isCapturing: false,
        error: null,
    });

    const startCapture = useCallback(async () => {
        try {
            // Request display media with audio
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: 1, // Minimal video requirements as we only want audio
                    height: 1,
                },
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                },
            });

            // Check if we actually got an audio track
            const audioTrack = stream.getAudioTracks()[0];
            if (!audioTrack) {
                throw new Error("No audio track selected. Please make sure to share audio.");
            }

            // Handle stream ending (user clicks "Stop Sharing" in browser UI)
            audioTrack.onended = () => {
                stopCapture();
            };

            setState({
                stream,
                isCapturing: true,
                error: null,
            });

            return stream;
        } catch (err) {
            console.error("Error starting capture:", err);
            setState((prev) => ({
                ...prev,
                error: err instanceof Error ? err.message : "Failed to start capture",
                isCapturing: false,
            }));
            return null;
        }
    }, []);

    const stopCapture = useCallback(() => {
        setState((prev) => {
            if (prev.stream) {
                prev.stream.getTracks().forEach((track) => track.stop());
            }
            return {
                stream: null,
                isCapturing: false,
                error: null,
            };
        });
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (state.stream) {
                state.stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [state.stream]);

    return {
        ...state,
        startCapture,
        stopCapture,
    };
}
