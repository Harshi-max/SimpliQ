import { NextResponse } from "next/server";
import { getLeads } from "@/lib/store";

export async function GET() {
  try {
    const leads = getLeads();
    
    // Header for CSV file
    let csvContent = "ID,Name,Company,Email,Status,Date\n";
    
    // Generate CSV lines
    leads.forEach((lead) => {
      // Escape commas and double quotes in fields to ensure valid CSV syntax
      const name = `"${lead.name.replace(/"/g, '""')}"`;
      const company = `"${lead.company.replace(/"/g, '""')}"`;
      const email = `"${lead.email.replace(/"/g, '""')}"`;
      const status = `"${lead.status}"`;
      const date = `"${new Date(lead.date).toISOString()}"`;
      
      csvContent += `${lead.id},${name},${company},${email},${status},${date}\n`;
    });
    
    // Return CSV response with attachment headers
    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=master_leads.csv",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error: any) {
    console.error("CSV Export Error:", error);
    return NextResponse.json({ error: "Failed to generate CSV" }, { status: 500 });
  }
}
