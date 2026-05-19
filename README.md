# SimplifIQ - AI Lead Intelligence & Automated Outreach Platform

SimplifIQ is a production-ready MVP for an AI-powered SaaS that automates the entire lead enrichment, auditing, and outreach process. When a prospect submits their details, the system validates the data, generates a highly personalized AI audit report, displays it instantly in-app, and delivers a beautifully formatted HTML report via email.

---

## 🛠️ Status Overview: What Has Been Implemented

Here is a summary of the architectural changes and features implemented in the current codebase:

- **Email Pipeline Migration:** Replaced the default Resend API implementation with **Nodemailer**. The application is now fully decoupled from sandboxed domain restrictions and capable of routing emails dynamically to any target address.
- **Auto-SMTP Fallback:** Configured `processLeadAction` to check for active Gmail configurations. If credentials are missing or incorrect, it automatically spins up a dummy Ethereal SMTP transporter. This ensures all mock sequences and local outreach tests run error-free and output a preview URL directly to the server logs.
- **Dynamic Session Store:** Implemented `src/lib/store.ts` using a `globalThis` cache to preserve state across Next.js fast-refresh cycles. The in-memory store records lead states (**generating**, **completed**, **failed**) in real-time.
- **Dynamic Admin Console:** Overhauled `/admin` to load dynamically from the local store instead of mock arrays. Top-level KPIs (Total Leads, Conversion Rate, Email Delivery Rates) update dynamically.
- **Campaign Sequence Manager:** Added sequence schemas to the database store and built a fully functional **Create Sequence** modal with a Server Action (`createSequenceAction`) to dynamically update sequence catalogs.
- **CSV Data Exporter:** Integrated a custom route handler at `/api/leads/export` to compile current lead logs into an RFC-compliant CSV download attachment.
- **In-App Strategy Panel:** Configured `LeadForm.tsx` to read the generated audit report and render an immersive on-screen breakdown (Roadmaps, Opportunities, AI ideas) upon successful validation.

---

## 🚀 Key Features

### 1. In-App AI Audit Analysis
Prospects get immediate value! Upon submitting the multi-step form, SimplifIQ processes the data and displays a rich, structured business audit right on the screen. The report features:
- **Executive Summary:** A strategic overview tailored to the company's biggest challenges.
- **Key Growth Opportunities:** Key avenues for scaling revenue and conversions.
- **AI Implementation Ideas:** Concrete ways the company can integrate AI to automate manual tasks.
- **Strategic Roadmap:** A phased timeline (Phases 1-3) detailing execution steps.

### 2. Double-Layer Nodemailer Outreach
We transitioned from sandboxed Resend restrictions to a self-hosted Nodemailer transport system. To ensure zero-friction testing out of the box:
- **Real Gmail Delivery:** Easily configured via a Gmail Address and a 16-character App Password.
- **Automated Fallback Server:** If Gmail credentials are missing, invalid, or throw authentication errors, the pipeline automatically spins up a temporary **Ethereal Email** test account. It logs a clickable message preview URL in the terminal so you can test email templates instantly without any configuration.

### 3. Dynamic Command Center (Admin Panel)
A premium dark-themed dashboard (`/admin`) that updates in real-time as users submit forms:
- **Dynamic Metrics:** Total Leads, Reports Generated, and Email Delivery Rate are calculated on the fly.
- **Real-Time Submissions List:** View leads by status (**Generating**, **Sent PDF**, or **Enrichment Failed**) and submission timestamp.
- **Multi-Tab Sidebar Navigation:** Toggle between **Leads** (Command Center), **Reports** (generated audits), and **Campaigns** without full page reloads.

### 4. Interactive Campaigns & Email Sequences
- Create new marketing sequences dynamically through an interactive modal.
- Sequences are stored in-memory and rendered in a detailed table displaying active/draft statuses and sent counts.
- Uses Next.js Server Actions to dynamically update sequence data and revalidate paths in real-time.

### 5. Master CSV Lead Export
- Located in the **Reports** tab.
- Downloads a clean, comma-separated (CSV) file containing the entire dynamic leads database (ID, Name, Company, Email, Status, Date) for external CRM import.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2.5 (App Router)
- **Styling:** Vanilla CSS & Tailwind CSS
- **UI Components:** shadcn/ui & Radix UI Primitives
- **Form Handling:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Emails:** Nodemailer
- **State Store:** Global In-memory Session State (retains data through hot-reloads)

---

## 📁 Directory Structure

```text
├── src/
│   ├── actions/
│   │   ├── createSequence.ts       # Server action to create email sequences
│   │   └── processLead.ts          # Core Server Action for lead enrichment & email sending
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx            # Dynamic Admin Dashboard page (Command Center)
│   │   ├── api/
│   │   │   └── leads/
│   │   │       └── export/
│   │   │           └── route.ts    # API handler generating CSV lead exports
│   │   ├── get-started/
│   │   │   └── page.tsx            # Multi-step onboarding form container
│   │   ├── layout.tsx              # Root HTML wrapper with Sonner Toaster
│   │   └── page.tsx                # High-converting landing page
│   ├── components/
│   │   ├── ui/                     # Shared UI components (button, input, select, etc.)
│   │   ├── CreateSequenceModal.tsx # Dialog to add new email outreach sequences
│   │   └── LeadForm.tsx            # Onboarding form displaying instant AI audits
│   ├── lib/
│   │   ├── store.ts                # In-memory global state store (leads & campaigns)
│   │   └── utils.ts                # Tailwind CSS class merger utility
│   └── types/
│       └── index.ts                # Shared TypeScript schemas and validation types
├── .env                            # Local environment variables configuration
├── package.json                    # Dependencies and script definitions
└── README.md                       # Documentation
```

---

## ⚙️ How to Setup and Run Locally

Follow these step-by-step instructions to boot the system on your local machine:

### 1. Clone & Install Dependencies
First, check out the repository, navigate into the directory, and install all runtime and development packages:
```bash
git clone https://github.com/Harshi-max/SimpliQ.git
cd SimpliQ
npm install
```

### 2. Configure Local Environment Variables
Create a `.env` file in the root folder. You can configure your local environment to run in **Test Mode** (no email server setup needed) or **Live Mode** (sending actual emails to Gmail inboxes):

```env
# ==========================================
# 🟢 LIVE MODE SETUP (Optional)
# ==========================================
# Input your personal details to send real emails to submitted leads:
EMAIL_USER="your-email@gmail.com"
EMAIL_APP_PASSWORD="your-16-character-app-password"

# ==========================================
# 🟡 TEST MODE SETUP (Default fallback)
# ==========================================
# Leave the credentials blank or with default placeholders, 
# and the app will generate local Ethereal test emails automatically.
```

> [!NOTE]
> To get a valid Gmail `EMAIL_APP_PASSWORD`:
> 1. Open your Google Account page and verify **2-Step Verification** is enabled.
> 2. Search for **App passwords** in the top search bar.
> 3. Generate a password for the app named `SimplifIQ`.
> 4. Copy the 16-character code and paste it into the `.env` variable (without spaces).

### 3. Start the Next.js Local Server
Start your Next.js local development server with:
```bash
npm run dev
```

Your terminal will print the active development address (usually `http://localhost:3000`).

### 4. Navigating the Application
Once the local server is running, you can access the following pages:
- **Landing Page:** Open `http://localhost:3000` to view the modern landing page.
- **Intake Form:** Go to `http://localhost:3000/get-started` to test the multi-step onboarding wizard.
- **Admin Dashboard:** Navigate to `http://localhost:3000/admin` to access the command center and monitor leads, reports, and campaigns.

---

## 🧪 Testing the Application Flows

1. **Intake Flow:** Go to `/get-started`, fill out the multi-step form, and hit **Generate AI Audit**.
   - Verify the audit report renders instantly on the success screen.
   - Look at your dev server terminal. You should see a log: `Automated Email Generated! Preview URL: https://ethereal.email/message/...`. Copy and open the link to view the fully-rendered HTML email template!
2. **Dashboard Verification:** Go to `/admin`.
   - The metrics (Total Leads, Reports Generated, Emails Delivered) will dynamically update.
   - The lead you just submitted will appear in the table with its dynamic timestamp and status tag.
3. **Sequence Creation:** Go to `/admin?tab=campaigns`, click **Create New Sequence**, input your template parameters, and confirm it appends dynamically to the campaigns list.
4. **CSV Export:** Go to `/admin?tab=reports` and click **Download Master CSV**. Verify that a CSV file containing your database records downloads instantly.
