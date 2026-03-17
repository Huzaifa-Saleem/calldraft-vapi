import CallInterface from "@/components/CallInterface";
import { Shield, Thermometer, Wind, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#fcfcfc] dark:bg-[#030303] overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen py-20 px-4">
        {/* Centered Logo/Branding */}
        <div className="flex flex-col items-center  space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              CallDraft<span className="text-orange-500">.</span>
            </h2>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto font-medium leading-relaxed">
            Experience natural real-time conversations with Sarah, our
            professional HVAC service agent.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <CallInterface />
        </div>
      </main>
    </div>
  );
}
