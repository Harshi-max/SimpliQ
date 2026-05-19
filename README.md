# SimplifIQ - AI Lead Intelligence & Automated Outreach Platform

SimplifIQ is a production-ready MVP for an AI-powered SaaS that automates the entire lead enrichment, auditing, and outreach process. When a prospect submits their details, the system validates the data, generates a highly personalized AI audit report, displays it instantly in-app, and delivers a beautifully formatted HTML report via email.

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

## ⚙️ Getting Started & Local Setup

### 1. Clone & Install Dependencies
Navigate to the project root and run:
```bash
npm install
```

### 2. Environment Variables Configuration
Create a `.env` file in the root folder. Paste the following structure:
```env
# Gmail SMTP Credentials (Optional - Real Email Delivery)
EMAIL_USER="your-email@gmail.com"
EMAIL_APP_PASSWORD="your-16-character-app-password"

# Optional Database Configurations
DATABASE_URL="your-postgresql-database-url"
```

> [!IMPORTANT]
> **If you leave Gmail credentials as placeholder values or omit them**, the platform will silently activate the Ethereal Email test system. Real emails won't send, but a clickable preview URL will print in your terminal logs!

#### How to get a Google App Password:
1. Log in to your [Google Account Settings](https://myaccount.google.com).
2. Go to **Security**.
3. Under "How you sign in to Google", ensure **2-Step Verification** is turned **ON**.
4. Search for **App passwords** in the search bar.
5. Create a new App Password (name it `SimplifIQ`).
6. Copy the generated **16-character code** (e.g. `abcd efgh ijkl mnop`) and set it as `EMAIL_APP_PASSWORD` in your `.env`.

### 3. Run Development Server
Start the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application!

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
