import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Phone, PhoneOff, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallControlsProps {
  callStatus: "idle" | "loading" | "active" | "error";
  isSpeaking: boolean;
  onStart: () => void;
  onEnd: () => void;
}

export function CallControls({ callStatus, isSpeaking, onStart, onEnd }: CallControlsProps) {
  return (
    <CardFooter className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {callStatus === "active" && (
          <div className="flex items-center space-x-1.5">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-1 h-3 bg-orange-500 rounded-full transition-all duration-300",
                  isSpeaking ? "animate-bounce" : "opacity-30"
                )}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          {callStatus === "active" ? (isSpeaking ? "Sarah is speaking…" : "Listening…") : "Start conversation"}
        </span>
      </div>

      <div className="flex space-x-3">
        {callStatus === "active" ? (
          <Button 
            variant="destructive" 
            size="lg" 
            className="rounded-full px-8 shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            onClick={onEnd}
          >
            <PhoneOff className="w-4 h-4 mr-2" />
            End Call
          </Button>
        ) : (
          <Button 
            variant="default" 
            size="lg" 
            disabled={callStatus === "loading"}
            className="rounded-full px-10 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 shadow-2xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            onClick={onStart}
          >
            {callStatus === "loading" ? (
              <Activity className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Phone className="w-4 h-4 mr-2" />
            )}
            {callStatus === "loading" ? "Connecting…" : "Start Call"}
          </Button>
        )}
      </div>
    </CardFooter>
  );
}
