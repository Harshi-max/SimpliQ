# SimplifIQ - AI Lead Intelligence & Automated Outreach Platform

SimplifIQ is a production-ready MVP for an AI-powered SaaS that automates the entire lead enrichment, auditing, and outreach process. When a prospect submits their details, the system validates the data, generates a highly personalized AI audit report, and theoretically delivers it as a professional PDF via email without human intervention.

## Features
- **Modern Landing Page**: High-converting, beautiful, Framer Motion-powered UI.
- **Multi-Step Intake Form**: React Hook Form + Zod with stateful progress.
- **Server Actions**: Next.js Server Actions handle the pipeline securely.
- **Admin Dashboard**: A sleek command center to monitor lead flow.
- **Premium UI**: Built with Tailwind CSS, shadcn/ui, and Radix Primitives.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Forms**: React Hook Form, Zod
- **Icons**: Lucide React

## Architecture & Workflows
1. **Lead Submission**: User enters information on the `/get-started` route.
2. **Server Action Validation**: Zod validates the incoming data on the server.
3. **Data Enrichment**: `processLeadAction` mocks fetching company insights (to be wired to Clearbit/Apollo).
4. **AI Audit Generation**: The system mocks an LLM call to generate a deep-dive business analysis based on the lead's constraints.
5. **Fulfillment**: Displays a success UI, and in a real environment, dispatches a Resend API email with a React-PDF generated attachment.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in your keys if you plan to wire up the actual APIs.
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
This application is Vercel-ready. Simply connect your GitHub repository to Vercel and deploy.
```bash
npx vercel
```

## Future Improvements
- Wire up actual Resend API for email delivery.
- Implement `@react-pdf/renderer` for dynamic PDF generation on Edge runtimes.
- Connect to Supabase or PostgreSQL for persistent lead tracking.
- Integrate Firecrawl/Playwright for fallback scraping when API enrichment fails.
