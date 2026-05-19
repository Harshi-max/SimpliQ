"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, X } from "lucide-react";
import { createSequenceAction } from "@/actions/createSequence";

export function CreateSequenceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    const res = await createSequenceAction({ name, subject });
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Sequence created successfully!");
      setIsOpen(false);
      setName("");
      setSubject("");
    } else {
      toast.error(res.error || "Failed to create sequence.");
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 px-6"
      >
        <Plus className="w-4 h-4" /> Create New Sequence
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <header className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold font-outfit text-white">New Outreach Sequence</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seqName" className="text-slate-300">Sequence Name</Label>
                <Input 
                  id="seqName" 
                  placeholder="e.g. Cold AI Audit Outreach" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="bg-slate-950 border-white/10 focus-visible:ring-blue-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seqSubject" className="text-slate-300">Email Subject Line</Label>
                <Input 
                  id="seqSubject" 
                  placeholder="e.g. Your AI Lead Intelligence Audit for {{company}}" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  className="bg-slate-950 border-white/10 focus-visible:ring-blue-500 text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/5 rounded-full text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...
                    </>
                  ) : "Create Sequence"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
