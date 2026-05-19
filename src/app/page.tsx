"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, FileText, Mail, Search, Sparkles, BarChart3, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 w-8 h-8 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold font-outfit tracking-tight">SimplifIQ</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#workflow" className="hover:text-white transition-colors">Workflow</Link>
          <Link href="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/get-started">
            <Button className="bg-white text-slate-950 hover:bg-slate-200 rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.3)] font-medium">
              Generate AI Audit <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8 font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Introducing Lead Intelligence 2.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-outfit leading-tight mb-6">
            Turn every prospect into a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              personalized masterpiece
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            SimplifIQ automatically researches your leads, analyzes their business, generates a stunning AI audit, and delivers it directly to their inbox. Zero human intervention.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-started">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-14 text-lg font-medium shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                Try Live Demo
              </Button>
            </Link>
            <Link href="#workflow">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-medium border-white/10 hover:bg-white/5 backdrop-blur-sm">
                How it works
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-2 shadow-2xl overflow-hidden ring-1 ring-white/5">
            <div className="rounded-xl border border-white/5 bg-slate-950 overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="mx-auto bg-white/5 rounded-md px-4 py-1 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  simplifiq.ai/report/demo-corp
                </div>
              </div>
              <div className="aspect-[16/9] bg-slate-950 flex flex-col md:flex-row">
                <div className="w-full md:w-64 border-r border-white/5 p-6 flex flex-col gap-6">
                  <div className="h-4 w-24 bg-white/10 rounded-full" />
                  <div className="space-y-3">
                    <div className="h-3 w-full bg-white/5 rounded-full" />
                    <div className="h-3 w-3/4 bg-white/5 rounded-full" />
                    <div className="h-3 w-5/6 bg-white/5 rounded-full" />
                  </div>
                  <div className="mt-auto space-y-3">
                    <div className="h-10 w-full bg-blue-600/20 rounded-lg border border-blue-500/30 flex items-center justify-center">
                      <span className="h-2 w-16 bg-blue-400/50 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-8">
                  <div className="h-8 w-64 bg-white/10 rounded-lg mb-8" />
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="h-32 bg-white/5 rounded-xl border border-white/5 p-6 flex flex-col gap-4">
                      <div className="h-4 w-12 bg-white/10 rounded-full" />
                      <div className="h-8 w-24 bg-white/20 rounded-lg" />
                    </div>
                    <div className="h-32 bg-white/5 rounded-xl border border-white/5 p-6 flex flex-col gap-4">
                      <div className="h-4 w-12 bg-white/10 rounded-full" />
                      <div className="h-8 w-24 bg-white/20 rounded-lg" />
                    </div>
                  </div>
                  <div className="h-48 bg-white/5 rounded-xl border border-white/5 p-6">
                    <div className="h-4 w-32 bg-white/10 rounded-full mb-6" />
                    <div className="space-y-4">
                      <div className="h-3 w-full bg-white/10 rounded-full" />
                      <div className="h-3 w-5/6 bg-white/10 rounded-full" />
                      <div className="h-3 w-4/6 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="container mx-auto px-6 py-32 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-4">Autonomous Pipeline</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">From form submission to personalized outreach in under 60 seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Users, title: "1. Lead Capture", desc: "Prospect fills out a beautiful, high-converting form." },
            { icon: Search, title: "2. Data Enrichment", desc: "We instantly pull tech stack, firmographics & funding." },
            { icon: Bot, title: "3. AI Analysis", desc: "GPT-4 researches their website and creates a custom strategy." },
            { icon: FileText, title: "4. PDF & Email", desc: "A stunning PDF is generated and emailed automatically." }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <step.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-20 border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">Built for high-ticket B2B sales.</h2>
            <p className="text-slate-400 mb-8 text-lg">
              Generic outreach is dead. SimplifIQ helps you stand out by delivering immense, personalized value the moment a prospect shows interest.
            </p>
            <ul className="space-y-4">
              {[
                "Web Scraping Fallbacks (Playwright/Firecrawl)",
                "Investor-grade PDF generation",
                "Advanced Prompt Engineering for hyper-personalization",
                "Automated Resend Email Sequences"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative">
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Automated Outreach</span>
                  </div>
                  <p className="text-xs text-slate-400">"Hi John, I noticed Acme Corp recently launched X. I ran a quick AI audit on your current stack and found 3 automation opportunities..."</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 ml-8">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Conversion Spikes</span>
                  </div>
                  <p className="text-xs text-slate-400">Prospect opens PDF -&gt; 80% higher reply rate -&gt; More booked calls.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-32 relative z-10">
        <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl p-1 md:p-px relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-3xl z-0" />
          <div className="bg-slate-950/90 rounded-[1.4rem] p-12 md:p-20 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6">Ready to scale your outreach?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Stop sending generic emails. Start sending highly personalized value propositions on autopilot.
            </p>
            <Link href="/get-started">
              <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-200 rounded-full px-10 h-16 text-lg font-medium shadow-2xl">
                Start Generating Audits <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-slate-500 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold font-outfit text-slate-300">SimplifIQ</span>
          </div>
          <p>© 2026 SimplifIQ AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
