# SimplifIQ — AI Lead Intelligence & Automated Outreach Platform

SimplifIQ is an AI-powered SaaS platform that automates lead enrichment, business auditing, and personalized outreach workflows.  
When a prospect submits their details, the platform validates the data, generates an AI-driven audit report, displays it instantly in-app, and sends a beautifully formatted outreach email automatically.

---

# 🌐 Live Demo

## 🚀 Deployed Application
https://simpli-q.vercel.app/

## 🎥 Full Walkthrough Video
https://drive.google.com/file/d/1r3F0FP4Di8a5OxJ5sf43JxFCkD7vZ1Jx/view?usp=sharing

---

# ✨ Features

## 🔍 AI-Powered Business Audit Generation

Generate structured AI audit reports instantly after form submission.

### Includes:
- Executive Summary
- Growth Opportunities
- AI Automation Recommendations
- Strategic Roadmap
- Actionable Insights

---

## 📧 Automated Outreach Pipeline

Built using **Nodemailer** with dual delivery modes.

### ✅ Live Gmail Delivery
Configure Gmail SMTP credentials to send real outreach emails.

### ✅ Ethereal Fallback Testing
If SMTP credentials are unavailable or invalid:
- Automatically spins up an Ethereal SMTP server
- Generates preview URLs for testing emails locally
- No setup required for development

---

## 📊 Dynamic Admin Dashboard

A real-time command center for monitoring platform activity.

### Dashboard Capabilities
- Live Lead Tracking
- Report Generation Status
- Delivery Metrics
- Campaign Monitoring
- Real-Time Submission Updates

---

## 🧠 Campaign & Sequence Management

Create and manage outreach campaigns dynamically.

### Features
- Create New Email Sequences
- Track Active/Draft Campaigns
- Real-Time State Updates
- Dynamic Sequence Rendering

---

## 📁 CSV Export System

Export all generated lead data instantly as a CSV file for CRM imports or reporting.

### Includes:
- Lead Name
- Company
- Email
- Status
- Submission Timestamp

---

# 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| Forms & Validation | React Hook Form + Zod |
| Animations | Framer Motion |
| Email Service | Nodemailer |
| State Management | Global In-Memory Store |
| Deployment | Vercel |

---

# 📂 Project Structure

```bash
├── src/
│   ├── actions/
│   │   ├── createSequence.ts
│   │   └── processLead.ts
│   │
│   ├── app/
│   │   ├── admin/
│   │   ├── api/
│   │   │   └── leads/export/
│   │   ├── get-started/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── CreateSequenceModal.tsx
│   │   └── LeadForm.tsx
│   │
│   ├── lib/
│   │   ├── store.ts
│   │   └── utils.ts
│   │
│   └── types/
│       └── index.ts
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Local Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Harshi-max/SimpliQ.git
cd SimpliQ
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory.

```env
# Gmail SMTP Configuration (Optional)

EMAIL_USER="your-email@gmail.com"
EMAIL_APP_PASSWORD="your-app-password"
```

> If credentials are not provided, SimplifIQ automatically switches to Ethereal Email testing mode.

---

## 4️⃣ Run the Development Server

```bash
npm run dev
```

App runs on:

```bash
http://localhost:3000
```

---

# 🧪 Testing Workflow

## Lead Intake Flow

Visit:

```bash
/get-started
```

- Submit company information
- Generate AI audit
- Verify report rendering
- Check email preview link in terminal

---

## Admin Dashboard

Visit:

```bash
/admin
```

Verify:
- Dynamic lead updates
- Report statuses
- Campaign metrics
- Email delivery tracking

---

## Campaign Management

Inside `/admin`:
- Create outreach sequences
- Manage campaigns dynamically
- Monitor active/draft sequences

---

## CSV Export

Navigate to:
- Reports Tab → Download CSV

Exports all generated lead records instantly.

---

# 📧 SMTP Setup (Optional)

To send real emails:

1. Enable **2-Step Verification** on Google
2. Generate an **App Password**
3. Add credentials to `.env`

```env
EMAIL_USER="your-email@gmail.com"
EMAIL_APP_PASSWORD="your-16-char-password"
```

---

# 🚀 Production Highlights

- AI-Powered Lead Intelligence
- Automated Outreach Engine
- Real-Time Admin Analytics
- Dynamic Campaign Management
- Instant CSV Exporting
- Fully Responsive UI
- Production-Ready Architecture

---

# 👨‍💻 Author

## Harshitha Arava

- GitHub: https://github.com/Harshi-max
- LinkedIn: https://www.linkedin.com/in/harshitha-arava/

---

# ⭐ If You Like This Project

Give it a star on GitHub and share feedback!
