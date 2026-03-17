"use client";

import React, { useState, useEffect } from "react";
import { vapi, TranscriptEntry } from "@/lib/vapi";
import { assistantId } from "@/lib/assistant-config";
import { Card, CardContent } from "@/components/ui/card";
import { StatusHeader } from "./call/StatusHeader";
import { Transcript } from "./call/Transcript";
import { CallControls } from "./call/CallControls";

export default function CallInterface() {
  const [callStatus, setCallStatus] = useState<"idle" | "loading" | "active" | "error">("idle");
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [latency, setLatency] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!vapi) return;

    vapi.on("call-start", () => setCallStatus("active"));
    vapi.on("call-end", () => {
      setCallStatus("idle");
      setLatency(null);
    });
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));

    vapi.on("message", (message: any) => {
      if (message.type === "transcript") {
        const { role, transcript, transcriptType } = message;
        if (transcriptType === "final") {
          setTranscripts((prev) => [
            ...prev,
            { role, text: transcript, id: Math.random().toString(36).substring(7) },
          ]);
        }
      }
      if (message.type === "monitor" && message.monitor?.latency) {
        setLatency(Math.round(message.monitor.latency * 1000));
      }
    });

    vapi.on("error", (error) => {
      console.error("Vapi Error details:", JSON.stringify(error, null, 2));
      setCallStatus("error");
    });

    return () => {
      if (vapi) vapi.removeAllListeners();
    };
  }, []);

  const startCall = async () => {
    if (!vapi) return;
    setCallStatus("loading");
    setTranscripts([]);
    try {
      await vapi.start(assistantId);
    } catch (err) {
      console.error(err);
      setCallStatus("error");
    }
  };

  const endCall = () => {
    if (vapi) vapi.stop();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="w-full border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl overflow-hidden transition-all duration-700">
        <StatusHeader callStatus={callStatus} latency={latency} />
        <CardContent className="p-0">
          <Transcript transcripts={transcripts} callStatus={callStatus} />
        </CardContent>
        <CallControls 
          callStatus={callStatus} 
          isSpeaking={isSpeaking} 
          onStart={startCall} 
          onEnd={endCall} 
        />
      </Card>

      <div className="grid grid-cols-2 gap-4 w-full mt-8 opacity-40">
        <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/50 dark:bg-zinc-900/50 text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 text-center">
          Real-time STT
        </div>
        <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/50 dark:bg-zinc-900/50 text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 text-center">
          Low Latency TTS
        </div>
      </div>
    </div>
  );
}
