import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusHeaderProps {
  callStatus: "idle" | "loading" | "active" | "error";
  latency: number | null;
}

export function StatusHeader({ callStatus, latency }: StatusHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
      <div className="flex items-center space-x-4">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-inner",
          callStatus === "active" ? "bg-orange-500 animate-pulse text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
        )}>
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Sarah
          </CardTitle>
          <div className="flex items-center space-x-3 mt-1">
            <Badge variant={callStatus === "active" ? "default" : "secondary"} className={cn(
              "capitalize transition-colors font-bold tracking-wide",
              callStatus === "active" ? "bg-green-500 hover:bg-green-600 text-white shadow-sm px-3" : ""
            )}>
              {callStatus === "active" ? "Live" : callStatus}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end space-y-1">
        {callStatus === "active" && (
          <div className={cn(
            "flex flex-col items-end px-4 py-2 rounded-2xl border transition-all duration-500 shadow-sm",
            latency === null 
              ? "bg-zinc-50 border-zinc-100 text-zinc-400"
              : latency < 300 
                ? "bg-green-50/50 border-green-100 text-green-700 dark:bg-green-950/20 dark:border-green-900/50 dark:text-green-400" 
                : latency < 700 
                  ? "bg-yellow-50/50 border-yellow-100 text-yellow-700 dark:bg-yellow-950/20 dark:border-yellow-900/50 dark:text-yellow-400"
                  : "bg-red-50/50 border-red-100 text-red-700 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400"
          )}>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-0.5 items-end h-3 mb-0.5">
                <div className={cn("w-1 rounded-full bg-current transition-all", (latency ?? 2000) < 1000 ? "h-1.5 opacity-100" : "h-1 opacity-20")} />
                <div className={cn("w-1 rounded-full bg-current transition-all", (latency ?? 2000) < 600 ? "h-2.5 opacity-100" : "h-1 opacity-20")} />
                <div className={cn("w-1 rounded-full bg-current transition-all", (latency ?? 2000) < 300 ? "h-3.5 opacity-100" : "h-1 opacity-20")} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">Latency</span>
            </div>
            <div className="text-lg font-black tabular-nums leading-none mt-1">
              {latency !== null ? `${latency}ms` : "-- ms"}
            </div>
          </div>
        )}
        <div className="text-right hidden sm:block pr-2">
          <p className="text-[10px] font-black text-zinc-300 dark:text-zinc-600 uppercase tracking-[0.2em]">Partner</p>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 font-serif italic">Anderson H&C</p>
        </div>
      </div>
    </CardHeader>
  );
}
