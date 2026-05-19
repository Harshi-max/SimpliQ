import { LeadFormData } from "@/types";

export type LeadRecord = {
  id: string;
  name: string;
  company: string;
  email: string;
  status: "completed" | "processing" | "failed";
  date: Date;
};

export type Sequence = {
  id: string;
  name: string;
  subject: string;
  status: "active" | "draft";
  sentCount: number;
};

// Use global variable to persist state across fast refreshes in development
const globalForStore = globalThis as unknown as {
  leads: LeadRecord[];
  sequences: Sequence[];
};

export const leadsStore: LeadRecord[] = globalForStore.leads || [
  { id: "1", name: "Sarah Jenkins", company: "TechFlow Inc", email: "sarah@techflow.com", status: "completed", date: new Date(Date.now() - 1000 * 60) },
  { id: "2", name: "Marcus Chen", company: "Innovate AI", email: "m.chen@innovate.ai", status: "processing", date: new Date(Date.now() - 1000 * 60 * 5) },
  { id: "3", name: "Emily Watson", company: "Global Reach", email: "emily.w@globalreach.co", status: "completed", date: new Date(Date.now() - 1000 * 60 * 60) },
];

export const sequencesStore: Sequence[] = globalForStore.sequences || [
  { id: "1", name: "Cold AI Audit Outreach", subject: "Your AI Lead Intelligence Audit for {{company}}", status: "active", sentCount: 142 },
  { id: "2", name: "Post-Audit Follow Up", subject: "Quick question about your SimplifIQ audit", status: "draft", sentCount: 0 }
];

if (process.env.NODE_ENV !== "production") {
  globalForStore.leads = leadsStore;
  globalForStore.sequences = sequencesStore;
}

export function addLead(lead: Omit<LeadRecord, "id">) {
  const newLead = { ...lead, id: Math.random().toString(36).substr(2, 9) };
  leadsStore.unshift(newLead);
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadRecord["status"]) {
  const lead = leadsStore.find(l => l.id === id);
  if (lead) {
    lead.status = status;
  }
}

export function getLeads() {
  return leadsStore;
}

export function getSequences() {
  return sequencesStore;
}

export function addSequence(seq: Omit<Sequence, "id">) {
  const newSeq = { ...seq, id: Math.random().toString(36).substr(2, 9) };
  sequencesStore.unshift(newSeq);
  return newSeq;
}
