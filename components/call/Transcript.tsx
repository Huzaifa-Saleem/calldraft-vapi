"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { TranscriptEntry } from "@/lib/vapi";

interface TranscriptProps {
  transcripts: TranscriptEntry[];
  activeTranscript: TranscriptEntry | null;
  callStatus: string;
}

export function Transcript({ transcripts, activeTranscript, callStatus }: TranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcripts, activeTranscript]);

  return (
    <ScrollArea className="h-[350px] p-6" ref={scrollRef}>
      <div className="space-y-6 pb-4">
        {transcripts.length === 0 && callStatus === "idle" && (
          <div className="flex flex-col items-center justify-center h-[280px] text-zinc-400 space-y-2 italic">
            <p className="text-sm font-medium opacity-60">Ready to help your callers…</p>
          </div>
        )}
        {transcripts.map((entry) => (
          <div
            key={entry.id}
            className={cn(
              "flex flex-col max-w-[85%] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
              entry.role === "assistant" ? "items-start" : "items-end ml-auto"
            )}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1.5 px-1">
              {entry.role === "assistant" ? "Sarah" : "You"}
            </span>
            <div className={cn(
              "px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm border",
              entry.role === "assistant" 
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-none border-zinc-100 dark:border-zinc-700" 
                : "bg-orange-600 text-white rounded-tr-none border-orange-700"
            )}>
              {entry.text}
            </div>
          </div>
        ))}

        {activeTranscript && (
          <div
            className={cn(
              "flex flex-col max-w-[85%] transition-all duration-200 animate-in fade-in slide-in-from-bottom-1",
              activeTranscript.role === "assistant" ? "items-start" : "items-end ml-auto"
            )}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1.5 px-1">
              {activeTranscript.role === "assistant" ? "Sarah" : "You"}
            </span>
            <div className={cn(
              "px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm border opacity-70 animate-pulse",
              activeTranscript.role === "assistant" 
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-none border-zinc-100 dark:border-zinc-700" 
                : "bg-orange-600 text-white rounded-tr-none border-orange-700"
            )}>
              {activeTranscript.text}
              <span className="inline-block w-1.5 h-1.5 ml-1 bg-current rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
