import { 
  Users, 
  FileText, 
  Mail, 
  TrendingUp, 
  Search, 
  MoreVertical,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLeads, getSequences } from "@/lib/store";
import { CreateSequenceModal } from "@/components/CreateSequenceModal";

export const dynamic = "force-dynamic";

export default function AdminDashboard({ searchParams }: { searchParams: { tab?: string } }) {
  const tab = searchParams.tab || "leads";
  const leads = getLeads();
  const sequences = getSequences();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 min-h-screen p-6 hidden md:block relative z-10 bg-slate-950/50 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-12">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-outfit tracking-tight">SimplifIQ</span>
          </div>
          <nav className="space-y-2">
            <Link href="/admin?tab=leads" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${tab === "leads" ? "bg-blue-500/10 text-blue-400" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}>
              <Users className="w-5 h-5" /> Leads
            </Link>
            <Link href="/admin?tab=reports" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${tab === "reports" ? "bg-purple-500/10 text-purple-400" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}>
              <FileText className="w-5 h-5" /> Reports
            </Link>
            <Link href="/admin?tab=campaigns" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${tab === "campaigns" ? "bg-green-500/10 text-green-400" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}>
              <Mail className="w-5 h-5" /> Campaigns
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 relative z-10">
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-outfit mb-1">
                {tab === "leads" ? "Command Center" : tab === "reports" ? "Generated Reports" : "Active Campaigns"}
              </h1>
              <p className="text-slate-400">
                {tab === "leads" ? "Monitor your automated outreach pipeline in real-time." : tab === "reports" ? "View and download all AI-generated audit reports." : "Manage your email sequences and delivery rates."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder={`Search ${tab}...`} 
                  className="bg-slate-900 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64"
                />
              </div>
              <Link href="/">
                <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5">
                  View Site
                </Button>
              </Link>
            </div>
          </header>

          {/* Metrics - Dynamic based on leads data (MVP version) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Leads", value: leads.length.toString(), change: "+12%", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Reports Generated", value: leads.filter(l => l.status === "completed").length.toString(), change: "+8%", icon: FileText, color: "text-purple-400", bg: "bg-purple-500/10" },
              { label: "Emails Delivered", value: leads.length > 0 ? Math.round((leads.filter(l => l.status === "completed").length / leads.length) * 100) + "%" : "0%", change: "+2.1%", icon: Mail, color: "text-green-400", bg: "bg-green-500/10" },
              { label: "Conversion Rate", value: "12.4%", change: "+4.3%", icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/10" },
            ].map((metric, i) => (
              <div key={i} className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.bg}`}>
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> {metric.change}
                  </span>
                </div>
                <div className="text-3xl font-bold font-outfit mb-1">{metric.value}</div>
                <div className="text-sm text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>

          {tab === "leads" && (
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Recent Leads Table */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold font-outfit">Recent Submissions</h2>
                <Button variant="ghost" className="text-sm text-blue-400 hover:text-blue-300">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950/50 text-slate-400 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4 font-medium">Lead Name</th>
                      <th className="px-6 py-4 font-medium">Company</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Time</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{lead.name}</div>
                          <div className="text-slate-500 text-xs">{lead.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-xs font-bold text-slate-300">
                              {lead.company.charAt(0)}
                            </div>
                            {lead.company}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {lead.status === "completed" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Sent PDF
                            </span>
                          )}
                          {lead.status === "processing" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              <Clock className="w-3.5 h-3.5 animate-pulse" /> Generating
                            </span>
                          )}
                          {lead.status === "failed" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                              <AlertCircle className="w-3.5 h-3.5" /> Enrichment Failed
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {new Date(lead.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-full">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {leads.length === 0 && (
                  <div className="p-10 text-center text-slate-500">
                    No leads have been generated yet. Go to the homepage to submit a lead!
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "reports" && (
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl backdrop-blur-sm p-10 text-center">
              <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold font-outfit mb-2">Reports Repository</h2>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">All generated PDF audits are securely stored here. Select a lead from the main Command Center to view their specific report.</p>
              <a href="/api/leads/export">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  Download Master CSV
                </Button>
              </a>
            </div>
          )}

          {tab === "campaigns" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-900/30 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div>
                  <h2 className="text-xl font-bold font-outfit text-white">Active Email Campaigns</h2>
                  <p className="text-slate-400 text-sm mt-1">Configure templates and sequences for automated outreach.</p>
                </div>
                <CreateSequenceModal />
              </div>

              <div className="bg-slate-900/50 border border-white/5 rounded-2xl backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950/50 text-slate-400 border-b border-white/5">
                      <tr>
                        <th className="px-6 py-4 font-medium">Sequence Name</th>
                        <th className="px-6 py-4 font-medium">Subject Line</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Outreach Count</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {sequences.map((seq) => (
                        <tr key={seq.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white flex items-center gap-2">
                              <Mail className="w-4 h-4 text-blue-400" />
                              {seq.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-300 font-mono text-xs">
                            {seq.subject}
                          </td>
                          <td className="px-6 py-4">
                            {seq.status === "active" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-white/10">
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            {seq.sentCount} emails sent
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-full">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {sequences.length === 0 && (
                    <div className="p-10 text-center text-slate-500">
                      No outreach sequences created yet. Click "Create New Sequence" above to get started.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
