import { LeadForm } from "@/components/LeadForm";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans">
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <header className="p-6 relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4 tracking-tight">Let's analyze your business</h1>
            <p className="text-slate-400 text-lg">Enter your details below to receive a personalized AI strategy audit.</p>
          </div>

          <LeadForm />
        </div>
      </main>
    </div>
  );
}
