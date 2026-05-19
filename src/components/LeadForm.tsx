"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2, Building, Target, Zap, Globe, TrendingUp } from "lucide-react";
import { leadFormSchema, LeadFormData, AiAuditReport } from "@/types";
import { processLeadAction } from "@/actions/processLead";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const steps = [
  { id: "personal", title: "Personal Details", icon: <CheckCircle2 className="w-5 h-5" /> },
  { id: "company", title: "Company Profile", icon: <Building className="w-5 h-5" /> },
  { id: "challenges", title: "Challenges & Goals", icon: <Target className="w-5 h-5" /> },
];

export function LeadForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);
  const [auditReport, setAuditReport] = useState<AiAuditReport | null>(null);

  const { register, handleSubmit, formState: { errors }, trigger, setValue, watch } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      websiteUrl: "",
      industry: "",
      companySize: "",
      mainChallenge: "",
      goals: "",
    }
  });

  const nextStep = async () => {
    const fieldsToValidate = currentStep === 0 
      ? ["firstName", "lastName", "email"] as const
      : currentStep === 1 
      ? ["companyName", "websiteUrl", "industry", "companySize"] as const
      : ["mainChallenge", "goals"] as const;

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    const result = await processLeadAction(data);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      if (result.auditReport) {
        setAuditReport(result.auditReport as AiAuditReport);
      }
      if (result.warning) {
        setSubmitWarning(result.message);
      } else {
        toast.success(result.message || "Audit request received!");
      }
    } else {
      toast.error(result.message || "Failed to process request. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-left p-8 bg-slate-900/50 border border-white/5 rounded-2xl backdrop-blur-xl w-full mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-outfit">Audit Complete!</h2>
            <p className="text-slate-400 text-sm">
              We've generated the personalized AI strategy for <span className="text-white font-medium">{watch("companyName")}</span>.
            </p>
          </div>
        </div>

        {submitWarning && (
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-sm max-w-full text-left leading-relaxed flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h4 className="font-semibold mb-1">Delivery Warning</h4>
              <p className="opacity-90">{submitWarning}</p>
            </div>
          </div>
        )}

        {auditReport && (
          <div className="space-y-6">
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Executive Summary</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{auditReport.executiveSummary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" /> Key Growth Opportunities
                </h3>
                <ul className="space-y-3">
                  {auditReport.growthOpportunities.map((opp, idx) => (
                    <li key={idx} className="text-slate-400 text-sm flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-400" /> AI Implementation Ideas
                </h3>
                <ul className="space-y-3">
                  {auditReport.aiImplementationIdeas.map((idea, idx) => (
                    <li key={idx} className="text-slate-400 text-sm flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-slate-950/50 p-6 rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" /> Strategic Roadmap
              </h3>
              <div className="space-y-4">
                {auditReport.strategicRoadmap.map((roadmap, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <span className="font-semibold text-blue-400 text-sm w-40 flex-shrink-0">{roadmap.phase}</span>
                    <span className="text-slate-400 text-sm">{roadmap.focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-end">
          <Button onClick={() => window.location.href = '/'} variant="outline" className="rounded-full bg-transparent border-white/10 hover:bg-white/5">
            Return Home
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      
      {/* Progress Header */}
      <div className="p-8 border-b border-white/5 bg-slate-950/50">
        <h2 className="text-2xl font-bold font-outfit mb-6">Generate Your Free Audit</h2>
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
                idx <= currentStep ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-slate-800 text-slate-500 border border-white/10'
              }`}>
                {step.icon}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${idx <= currentStep ? 'text-blue-400' : 'text-slate-500'}`}>
                {step.title}
              </span>
            </div>
          ))}
          <div className="absolute left-[10%] right-[10%] top-[4.5rem] h-[2px] bg-slate-800 -z-0 hidden sm:block">
            <div 
              className="h-full bg-blue-600 transition-all duration-500" 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" {...register("firstName")} className="bg-slate-950/50 border-white/10 focus-visible:ring-blue-500 h-12 rounded-xl" />
                      {errors.firstName && <span className="text-xs text-red-400">{errors.firstName.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" {...register("lastName")} className="bg-slate-950/50 border-white/10 focus-visible:ring-blue-500 h-12 rounded-xl" />
                      {errors.lastName && <span className="text-xs text-red-400">{errors.lastName.message}</span>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <div className="relative">
                      <Input id="email" type="email" placeholder="john@company.com" {...register("email")} className="bg-slate-950/50 border-white/10 focus-visible:ring-blue-500 h-12 rounded-xl pl-10" />
                      <Globe className="w-4 h-4 text-slate-500 absolute left-4 top-4" />
                    </div>
                    {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Acme Corp" {...register("companyName")} className="bg-slate-950/50 border-white/10 focus-visible:ring-blue-500 h-12 rounded-xl" />
                    {errors.companyName && <span className="text-xs text-red-400">{errors.companyName.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input id="websiteUrl" placeholder="https://acme.com" {...register("websiteUrl")} className="bg-slate-950/50 border-white/10 focus-visible:ring-blue-500 h-12 rounded-xl" />
                    {errors.websiteUrl && <span className="text-xs text-red-400">{errors.websiteUrl.message}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input id="industry" placeholder="SaaS" {...register("industry")} className="bg-slate-950/50 border-white/10 focus-visible:ring-blue-500 h-12 rounded-xl" />
                      {errors.industry && <span className="text-xs text-red-400">{errors.industry.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select onValueChange={(val) => val && setValue("companySize", val as string)}>
                        <SelectTrigger className="bg-slate-950/50 border-white/10 focus:ring-blue-500 h-12 rounded-xl">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501+">501+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.companySize && <span className="text-xs text-red-400">{errors.companySize.message}</span>}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="mainChallenge">What is your main challenge with lead generation or outreach?</Label>
                    <Textarea 
                      id="mainChallenge" 
                      placeholder="E.g., We spend too much time researching prospects manually..." 
                      {...register("mainChallenge")}
                      className="bg-slate-950/50 border-white/10 focus-visible:ring-blue-500 min-h-[100px] rounded-xl resize-none" 
                    />
                    {errors.mainChallenge && <span className="text-xs text-red-400">{errors.mainChallenge.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goals">What are your primary goals for the next quarter?</Label>
                    <Textarea 
                      id="goals" 
                      placeholder="E.g., Increase our demo booking rate by 20%..." 
                      {...register("goals")}
                      className="bg-slate-950/50 border-white/10 focus-visible:ring-blue-500 min-h-[100px] rounded-xl resize-none" 
                    />
                    {errors.goals && <span className="text-xs text-red-400">{errors.goals.message}</span>}
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-4">
                    <Zap className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-1">What happens next?</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Upon submission, our AI will instantly scrape your website, enrich your company data, and generate a highly personalized strategy report. This usually takes ~60 seconds.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between pt-6 border-t border-white/5">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0 || isSubmitting}
              className="rounded-full px-6 hover:bg-white/5 disabled:opacity-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 shadow-[0_0_20px_rgba(37,99,235,0.4)] relative overflow-hidden"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing Company...
                  </>
                ) : (
                  <>
                    Generate AI Audit <Zap className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
