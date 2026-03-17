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
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
          callStatus === "active" ? "bg-orange-500 animate-pulse text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
        )}>
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <CardTitle className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Sarah
          </CardTitle>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant={callStatus === "active" ? "default" : "secondary"} className={cn(
              "capitalize transition-colors",
              callStatus === "active" ? "bg-green-500 hover:bg-green-600 text-white" : ""
            )}>
              {callStatus === "active" ? "Connected" : callStatus}
            </Badge>
            {latency !== null && (
              <div className="flex items-center text-xs font-medium text-zinc-500 tabular-nums">
                <Clock className="w-3 h-3 mr-1" />
                {latency}ms
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Company</p>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 font-serif italic">Anderson Heating & Cooling</p>
      </div>
    </CardHeader>
  );
}
