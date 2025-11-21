"use client";

import { useState, useEffect, useRef } from "react";
import { useAudioCapture } from "@/hooks/useAudioCapture";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { Mic, MicOff, StopCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SessionPage() {
    const { stream, isCapturing, error, startCapture, stopCapture } = useAudioCapture();
    const [transcripts, setTranscripts] = useState<string[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useAudioRecorder({
        stream,
        isCapturing,
        onTranscript: (text) => {
            setTranscripts((prev) => [...prev, text]);
        },
    });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [transcripts]);

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col gap-6">
            {/* Header / Controls */}
            <div className="flex items-center justify-between p-6 glass rounded-2xl">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${isCapturing ? "bg-red-500/20" : "bg-white/5"}`}>
                        {isCapturing ? (
                            <Mic className="w-6 h-6 text-red-500 animate-pulse" />
                        ) : (
                            <MicOff className="w-6 h-6 text-white/40" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Active Session</h2>
                        <p className="text-sm text-white/60">
                            {isCapturing ? "Listening..." : "Ready to start"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {!isCapturing ? (
                        <button
                            onClick={startCapture}
                            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all flex items-center gap-2"
                        >
                            <Mic className="w-4 h-4" />
                            Start Capture
                        </button>
                    ) : (
                        <button
                            onClick={stopCapture}
                            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-xl font-medium transition-all flex items-center gap-2 border border-red-500/20"
                        >
                            <StopCircle className="w-4 h-4" />
                            End Session
                        </button>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <p>{error}</p>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex gap-6 min-h-0">
                {/* Transcription Feed */}
                <div className="flex-1 glass rounded-2xl p-6 overflow-y-auto space-y-4">
                    {transcripts.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-white/20">
                            <Mic className="w-12 h-12 mb-4" />
                            <p className="text-lg">Transcripts will appear here...</p>
                        </div>
                    ) : (
                        transcripts.map((text, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <p className="text-white/80 leading-relaxed">{text}</p>
                            </div>
                        ))
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Sidebar / Visualizer */}
                <div className="w-80 flex flex-col gap-6">
                    <div className="glass rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-white mb-4">Audio Input</h3>
                        <AudioVisualizer stream={stream} isActive={isCapturing} />
                        <div className="mt-4 text-xs text-white/40 text-center">
                            {isCapturing ? "Receiving audio signal" : "No audio signal"}
                        </div>
                    </div>

                    <div className="glass rounded-2xl p-6 flex-1">
                        <h3 className="text-sm font-semibold text-white mb-4">Session Info</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-white/40 block mb-1">Source</label>
                                <div className="text-sm text-white">System Audio (Tab/Window)</div>
                            </div>
                            <div>
                                <label className="text-xs text-white/40 block mb-1">Duration</label>
                                <div className="text-sm text-white">00:00:00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
