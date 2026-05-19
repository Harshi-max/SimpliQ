import { z } from "zod";

export const leadFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid work email address"),
  companyName: z.string().min(2, "Company name is required"),
  websiteUrl: z.string().url("Please enter a valid website URL (e.g., https://example.com)"),
  industry: z.string().min(2, "Industry is required"),
  companySize: z.string().min(1, "Please select a company size"),
  mainChallenge: z.string().min(10, "Please describe your main challenge (min 10 characters)"),
  goals: z.string().min(10, "Please describe your goals (min 10 characters)"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export interface EnrichmentData {
  description: string;
  icp: string;
  techStack: string[];
  seoInsights: string;
  competitors: string[];
  businessModel: string;
}

export interface AiAuditReport {
  executiveSummary: string;
  companyOverview: string;
  websiteAnalysis: string;
  growthOpportunities: string[];
  automationOpportunities: string[];
  aiImplementationIdeas: string[];
  leadGenerationInsights: string;
  uxUiObservations: string;
  seoInsights: string;
  competitivePositioning: string;
  personalizedRecommendations: string[];
  strategicRoadmap: { phase: string; focus: string }[];
  closingNote: string;
}
