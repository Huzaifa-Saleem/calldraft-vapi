import CallInterface from "@/components/CallInterface";
import { Shield, Thermometer, Wind, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#fcfcfc] dark:bg-[#030303] overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[10%] w-[50%] h-[50%] bg-orange-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-blue-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] dark:opacity-[0.03]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen py-20 px-4">
        {/* Centered Logo/Branding */}
        <div className="flex flex-col items-center mb-12 space-y-4">
          <div className="bg-zinc-900 dark:bg-zinc-100 p-2.5 rounded-2xl shadow-2xl shadow-orange-500/10">
            <Wind className="w-8 h-8 text-zinc-100 dark:text-zinc-900" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              CallDraft<span className="text-orange-500">.</span>
            </h2>
            <div className="inline-flex items-center space-x-2 px-3 py-0.5 mt-2 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 rounded-full text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Shield className="w-3 h-3" />
              <span>AI Receptionist Demo</span>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 text-wrap-balance leading-[1.05]">
            Revolutionizing <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-orange-700">HVAC Calls.</span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto font-medium leading-relaxed">
            Experience natural real-time conversations with Sarah, our professional HVAC service agent.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <CallInterface />
        </div>

        {/* Trust logos / decorative */}
        <div className="mt-24 flex flex-wrap justify-center gap-12 opacity-20 grayscale scale-90">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-5 h-5" />
            <span className="font-black text-xl uppercase tracking-tighter">HVAC Pro</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span className="font-black text-xl uppercase tracking-tighter">Comfort Air</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5" />
            <span className="font-black text-xl uppercase tracking-tighter">Breeze Tech</span>
          </div>
        </div>
      </main>

      <div className="absolute bottom-8 w-full text-center z-10">
        <p className="text-zinc-400 dark:text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          © 2026 CallDraft AI • Powered by Vapi
        </p>
      </div>
    </div>
  );
}
