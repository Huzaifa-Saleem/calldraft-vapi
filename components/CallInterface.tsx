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
  const [activeTranscript, setActiveTranscript] = useState<TranscriptEntry | null>(null);
  const lastUserSpeechEnd = React.useRef<number | null>(null);

  useEffect(() => {
    if (!vapi) return;

    vapi.on("call-start", () => {
      setCallStatus("active");
      setLatency(0); // Diagnostic: See if 0ms appears in UI
    });
    vapi.on("call-start-success", (event: any) => {
      console.log("Call Start Success:", event);
      const duration = event.totalDuration || event.duration;
      if (typeof duration === 'number') {
        const ms = Math.round(duration * 1000);
        console.log("Setting Setup Latency:", ms);
        setLatency(ms);
      }
    });

    vapi.on("network-quality-change", (event: any) => {
      console.log("Network Quality Change:", event);
      // Daily (which Vapi uses) sends stats here. Let's try to extract if present.
      if (event.stats?.latency) {
        setLatency(Math.round(event.stats.latency * 1000));
      }
    });

    vapi.on("call-end", () => {
      setCallStatus("idle");
      setLatency(null);
      setActiveTranscript(null);
      lastUserSpeechEnd.current = null;
    });
    
    vapi.on("speech-start", () => {
      setIsSpeaking(true);
      // Fallback: If assistant starts speaking, calculate turn latency
      if (lastUserSpeechEnd.current) {
        const turnLatency = Date.now() - lastUserSpeechEnd.current;
        console.log("Turn Latency (speech-start):", turnLatency);
        setLatency((prev) => turnLatency > 0 ? turnLatency : prev);
        lastUserSpeechEnd.current = null;
      }
    });

    vapi.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapi.on("message", (message: any) => {
      console.log("Vapi RAW Message:", message);
      
      // 1. Try to extract latency from any common field
      const rawLatency = message.latency ?? 
                        message.modelLatency ?? 
                        message.metadata?.latency ?? 
                        message.metadata?.totalLatency ?? 
                        message.monitor?.latency;

      if (typeof rawLatency === 'number') {
        // If it's small, it's probably in seconds
        const ms = Math.round(rawLatency < 10 ? rawLatency * 1000 : rawLatency);
        setLatency(ms);
      }

      // 2. Measure delay between user stop and assistant start
      if (message.type === "speech-update") {
        if (message.status === "started" && message.role === "assistant") {
          if (lastUserSpeechEnd.current) {
            const turnLatency = Date.now() - lastUserSpeechEnd.current;
            console.log("Measured Turn Latency:", turnLatency);
            setLatency(turnLatency);
            lastUserSpeechEnd.current = null;
          }
        } else if (message.status === "stopped" && message.role === "user") {
          lastUserSpeechEnd.current = Date.now();
        }
      }

      // 3. Handle transcripts
      if (message.type === "transcript") {
        const { role, transcript, transcriptType } = message;
        
        // Final user transcript is a good marker for speech end
        if (role === "user" && transcriptType === "final") {
          lastUserSpeechEnd.current = Date.now();
        }

        if (transcriptType === "partial") {
          setActiveTranscript({ role, text: transcript, id: "active-transcript" });
        } else if (transcriptType === "final") {
          setActiveTranscript(null);
          setTranscripts((prev) => [
            ...prev,
            { role, text: transcript, id: Math.random().toString(36).substring(7) },
          ]);
        }
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
    setLatency(1); // Set to 1ms to see if it shows up
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
          <Transcript 
            transcripts={transcripts} 
            activeTranscript={activeTranscript} 
            callStatus={callStatus} 
          />
        </CardContent>
        <CallControls 
          callStatus={callStatus} 
          isSpeaking={isSpeaking} 
          onStart={startCall} 
          onEnd={endCall} 
        />
        {callStatus === "active" && (
           <div className="px-4 py-1 text-[8px] text-zinc-400 border-t border-zinc-50 flex justify-between uppercase font-bold tracking-widest">
             <span>Engine: Vapi Web SDK</span>
             <span>State Value: {latency === null ? "null" : latency}</span>
           </div>
        )}
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
