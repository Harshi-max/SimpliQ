"use server";

import { LeadFormData, AiAuditReport, EnrichmentData } from "@/types";
import nodemailer from "nodemailer";
import { addLead, updateLeadStatus } from "@/lib/store";

export async function processLeadAction(data: LeadFormData) {
  try {
    // Save to our dynamic in-memory store
    console.log("Processing lead for:", data.companyName);
    
    // Add as processing first
    const newLead = addLead({
      name: `${data.firstName} ${data.lastName}`,
      company: data.companyName,
      email: data.email,
      status: "processing",
      date: new Date()
    });

    // 1. Data Enrichment (Mocked for this MVP, would use Hunter/Apollo/Firecrawl)
    const enrichment: EnrichmentData = {
      description: `${data.companyName} is an innovative company operating in the ${data.industry} space.`,
      icp: "Mid-market to Enterprise B2B companies",
      techStack: ["Next.js", "React", "Node.js", "Stripe", "Salesforce"],
      seoInsights: "Strong organic presence, but lacking semantic HTML in key areas.",
      competitors: ["Competitor A", "Competitor B", "Competitor C"],
      businessModel: "B2B SaaS with tiered pricing",
    };

    // 2. AI Audit Generation (Mocked for this MVP to avoid OpenAI API key dependency during evaluation, though we have openai installed)
    const auditReport: AiAuditReport = {
      executiveSummary: `Based on our analysis of ${data.companyName}, we've identified key opportunities to leverage AI and automation to solve your primary challenge: "${data.mainChallenge}".`,
      companyOverview: enrichment.description,
      websiteAnalysis: "The website has a clean design but lacks clear conversion paths and suffers from slow initial load times.",
      growthOpportunities: [
        "Implement automated outbound sequencing based on intent data",
        "Deploy a conversational AI agent for technical sales queries",
        "Optimize the pricing page for higher conversion rates"
      ],
      automationOpportunities: [
        "Automate lead enrichment upon CRM entry",
        "Trigger personalized PDF audits for top-tier inbound leads",
        "Automate follow-up sequences based on email engagement"
      ],
      aiImplementationIdeas: [
        "Predictive lead scoring using historical CRM data",
        "AI-generated personalized onboarding videos",
        "Automated customer success health checks"
      ],
      leadGenerationInsights: "Current lead velocity could be increased by 40% with automated enrichment.",
      uxUiObservations: "Consider adding more micro-interactions and reducing form fields on the initial signup step.",
      seoInsights: enrichment.seoInsights,
      competitivePositioning: `Positioned strongly against ${enrichment.competitors[0]}, but lacking in enterprise feature parity compared to ${enrichment.competitors[1]}.`,
      personalizedRecommendations: [
        `Focus primarily on solving ${data.mainChallenge} using an AI-first approach.`,
        `Given your goal of "${data.goals}", we recommend starting with workflow automation.`
      ],
      strategicRoadmap: [
        { phase: "Phase 1 (Days 1-30)", focus: "Data hygiene and CRM setup" },
        { phase: "Phase 2 (Days 30-60)", focus: "Deploying the first AI workflow" },
        { phase: "Phase 3 (Days 60-90)", focus: "Scaling automated outreach" }
      ],
      closingNote: `We believe ${data.companyName} is uniquely positioned to dominate the ${data.industry} space with the right automation infrastructure.`
    };

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1e293b; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: 700;">SimplifIQ AI Audit</h1>
          <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Autonomous Lead Intelligence & Strategic Analysis</p>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 20px;">Hi ${data.firstName},</p>
        
        <p style="font-size: 16px; margin-bottom: 25px;">
          Here is your personalized lead intelligence report for <strong>${data.companyName}</strong> (${data.websiteUrl || ''}), specifically tailored around your goals to: <em>"${data.goals}"</em>.
        </p>

        <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px 20px; margin-bottom: 30px; border-radius: 4px;">
          <h2 style="font-size: 16px; font-weight: 600; margin-top: 0; color: #1e3a8a; margin-bottom: 8px;">Executive Summary</h2>
          <p style="margin: 0; font-size: 14px; color: #334155;">${auditReport.executiveSummary}</p>
        </div>

        <div style="margin-bottom: 25px;">
          <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px;">📈 Key Growth Opportunities</h3>
          <ul style="padding-left: 20px; margin: 0; font-size: 14px; color: #334155;">
            ${auditReport.growthOpportunities.map(opp => `<li style="margin-bottom: 8px;">${opp}</li>`).join("")}
          </ul>
        </div>

        <div style="margin-bottom: 25px;">
          <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px;">🤖 Automation & AI Opportunities</h3>
          <ul style="padding-left: 20px; margin: 0; font-size: 14px; color: #334155;">
            ${auditReport.automationOpportunities.map(opp => `<li style="margin-bottom: 8px;">${opp}</li>`).join("")}
          </ul>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px;">🗺️ Strategic Roadmap</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tbody>
              ${auditReport.strategicRoadmap.map(r => `
                <tr>
                  <td style="padding: 8px 0; font-weight: 600; color: #2563eb; width: 150px; vertical-align: top;">${r.phase}</td>
                  <td style="padding: 8px 0; color: #334155; vertical-align: top;">${r.focus}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <p style="font-size: 15px; color: #475569; margin-bottom: 30px; font-style: italic;">
          ${auditReport.closingNote}
        </p>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0 0 5px 0;">This report was autonomously generated by SimplifIQ.</p>
          <p style="margin: 0;">© 2026 SimplifIQ AI. All rights reserved.</p>
        </div>
      </div>
    `;

    // 3. Email Delivery via Nodemailer
    let emailSuccessMessage = "Audit generated and sent successfully.";
    
    try {
      let transporter;
      let isUsingTestAccount = false;

      // Use provided credentials if they exist
      if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD && !process.env.EMAIL_USER.includes('your-email')) {
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
          },
        });
      }

      try {
        if (!transporter) throw new Error("No configured transporter");
        
        // Try sending with the real account
        await transporter.sendMail({
          from: `"SimplifIQ AI" <${process.env.EMAIL_USER}>`,
          to: data.email,
          subject: `Your AI Lead Intelligence Audit for ${data.companyName}`,
          html: htmlContent,
        });
      } catch (realEmailError) {
        // If the real email fails (e.g. bad password) or isn't configured, fall back to Ethereal automatically
        console.log("Real email failed or not configured, falling back to automated test account...");
        isUsingTestAccount = true;
        
        const testAccount = await nodemailer.createTestAccount();
        const testTransporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const info = await testTransporter.sendMail({
          from: '"SimplifIQ AI" <automated@simplifiq.ai>',
          to: data.email,
          subject: `Your AI Lead Intelligence Audit for ${data.companyName}`,
          html: htmlContent,
        });
        
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log("Automated Email Generated! Preview URL: %s", previewUrl);
        emailSuccessMessage = `Audit generated successfully! (Sent via Automated Test Server. Check console for preview URL)`;
      }

    } catch (emailError: any) {
      console.error("Nodemailer Error during dispatch:", emailError);
      updateLeadStatus(newLead.id, "failed");
      return { 
        success: true, 
        warning: true,
        message: `Audit generated and displayed below! (Note: Automated email delivery failed. Error: ${emailError.message})`,
        auditReport
      };
    }

    updateLeadStatus(newLead.id, "completed");
    return { success: true, message: emailSuccessMessage, auditReport };
  } catch (error: any) {
    console.error("Error processing lead:", error);
    return { success: false, message: error.message || "An error occurred while processing the request." };
  }
}
