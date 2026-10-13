export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceCategory: string;
  budgetRangeINR: string; // e.g. "₹2L - ₹5L", "₹5L - ₹15L", "₹15L - ₹30L", "₹30L+"
  timeline: string; // e.g. "< 2 Weeks (Urgent)", "1 Month", "2-3 Months", "Flexible"
  projectDetails: string;
  city?: string; // e.g. "Bengaluru", "Mumbai", "Delhi-NCR", "Hyderabad", "Other"
  status: "New" | "Contacted" | "In Review" | "Proposal Sent" | "Closed Won" | "Disqualified";
  priority: "High" | "Medium" | "Low";
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  source: string; // e.g. "Website - Contact Page", "Website - Hero CTA"
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "superadmin" | "admin";
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface LeadStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  inReviewLeads: number;
  proposalSentLeads: number;
  closedWonLeads: number;
  totalPipelineValueINR: string;
}
