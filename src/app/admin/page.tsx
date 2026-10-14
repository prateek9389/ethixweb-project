"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lead } from "@/lib/types";
import BrandLogo from "@/components/BrandLogo";
import { 
  ShieldCheck, 
  Search, 
  Download, 
  RefreshCw, 
  LogOut, 
  Database, 
  Clock, 
  PhoneCall, 
  Mail, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  IndianRupee, 
  Layers, 
  Trash2, 
  Edit3, 
  Eye, 
  X, 
  Save, 
  Calendar,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [dbProvider, setDbProvider] = useState<string>("persistent_file");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [budgetFilter, setBudgetFilter] = useState<string>("ALL");
  
  // Selected lead for modal view & note editing
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Verify Auth
      const authRes = await fetch("/api/auth/me");
      if (!authRes.ok) {
        router.push("/admin/login");
        return;
      }

      // 2. Fetch Leads
      const res = await fetch("/api/leads");
      if (!res.ok) {
        throw new Error("Failed to load leads");
      }

      const data = await res.json();
      if (data.success) {
        setLeads(data.data.leads || []);
        setDbProvider(data.data.dbProvider || "persistent_file");
      }
    } catch (err) {
      console.error("Dashboard error:", err);
      setActionMessage("Error fetching leads. Please check authentication.");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle lead status change
  const handleStatusChange = async (leadId: string, newStatus: Lead["status"]) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setActionMessage(`Status updated to "${newStatus}"`);
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Handle saving internal notes
  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setIsSavingNote(true);

    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internalNotes: editNotes }),
      });

      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, internalNotes: editNotes } : l))
        );
        setSelectedLead((prev) => (prev ? { ...prev, internalNotes: editNotes } : null));
        setActionMessage("Internal notes saved successfully.");
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to save note:", err);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Handle delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;

    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(null);
        }
        setActionMessage("Lead removed.");
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      "Lead ID",
      "Full Name",
      "Email",
      "Phone",
      "Company",
      "Service",
      "Budget (INR)",
      "Timeline",
      "City",
      "Status",
      "Created At (UTC)",
      "Internal Notes",
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      `"${l.serviceCategory.replace(/"/g, '""')}"`,
      `"${l.budgetRangeINR}"`,
      `"${l.timeline}"`,
      `"${l.city || ""}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${(l.internalNotes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Ethixweb_India_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and search
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.city && lead.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    const matchesBudget = budgetFilter === "ALL" || lead.budgetRangeINR === budgetFilter;

    return matchesSearch && matchesStatus && matchesBudget;
  });

  // Calculate statistics
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    inReview: leads.filter((l) => l.status === "In Review").length,
    proposalSent: leads.filter((l) => l.status === "Proposal Sent").length,
    closedWon: leads.filter((l) => l.status === "Closed Won").length,
  };

  return (
    <div className="min-h-screen bg-[#07080C] text-white pt-6 sm:pt-8 pb-16 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <span>Leads Management Portal</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E30613]/20 border border-[#E30613]/40 text-[#FF2B38]">
                  v2.4 Protected
                </span>
              </h1>
              <p className="text-xs text-gray-400">
                Direct lead management for Ethixweb India Technical Directors
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Database status pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121622] border border-white/10 text-xs text-gray-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>DB: </span>
              <strong className="text-emerald-400 capitalize">
                {dbProvider === "firestore"
                  ? "Firebase Firestore"
                  : dbProvider === "supabase"
                  ? "Supabase PostgreSQL"
                  : dbProvider === "mongodb"
                  ? "MongoDB Atlas"
                  : "Persistent Local DB"}
              </strong>
            </div>

            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121622] border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-[#1A2030] transition-colors"
              title="View Public Site"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>View Site</span>
            </Link>

            <button
              onClick={fetchLeads}
              className="p-2 rounded-xl bg-[#121622] border border-white/10 text-gray-300 hover:text-white hover:bg-[#1A2030] transition-colors"
              title="Refresh leads"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121622] border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-[#1A2030] transition-colors"
              title="Export to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-800/40 text-xs text-red-300 hover:bg-red-900/60 transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {actionMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl glass-panel border border-white/5">
            <p className="text-xs text-gray-400">Total Leads</p>
            <p className="text-2xl font-black text-white mt-1">{stats.total}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-blue-500/20 bg-blue-950/10">
            <p className="text-xs text-blue-300">New (Unreviewed)</p>
            <p className="text-2xl font-black text-blue-400 mt-1">{stats.new}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-amber-500/20 bg-amber-950/10">
            <p className="text-xs text-amber-300">Contacted</p>
            <p className="text-2xl font-black text-amber-400 mt-1">{stats.contacted}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-purple-500/20 bg-purple-950/10">
            <p className="text-xs text-purple-300">In Review</p>
            <p className="text-2xl font-black text-purple-400 mt-1">{stats.inReview}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-[#FF9933]/20 bg-[#FF9933]/10">
            <p className="text-xs text-[#FF9933]">Proposal Sent</p>
            <p className="text-2xl font-black text-[#FF9933] mt-1">{stats.proposalSent}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-emerald-500/20 bg-emerald-950/10">
            <p className="text-xs text-emerald-300">Closed Won</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">{stats.closedWon}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 rounded-2xl glass-panel border border-white/5 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, company, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#090B10] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#E30613]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Filter className="w-3.5 h-3.5" />
              <span>Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#090B10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#E30613]"
            >
              <option value="ALL">All Statuses ({leads.length})</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Review">In Review</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Disqualified">Disqualified</option>
            </select>

            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="bg-[#090B10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#E30613]"
            >
              <option value="ALL">All Budgets</option>
              <option value="₹2L - ₹5L">₹2L - ₹5L</option>
              <option value="₹5L - ₹15L">₹5L - ₹15L</option>
              <option value="₹15L - ₹30L">₹15L - ₹30L</option>
              <option value="₹30L+">₹30L+</option>
            </select>
          </div>
        </div>

        {/* Leads Container (Responsive: Mobile Cards + Desktop Table) */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          {/* Mobile Card View (block on small screens, hidden on md+) */}
          <div className="block md:hidden p-3.5 space-y-3">
            {filteredLeads.length === 0 ? (
              <div className="py-10 text-center text-gray-500 text-xs">
                No leads match your current search and filter criteria.
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const statusColors: Record<string, string> = {
                  New: "bg-blue-500/20 text-blue-300 border-blue-500/40",
                  Contacted: "bg-amber-500/20 text-amber-300 border-amber-500/40",
                  "In Review": "bg-purple-500/20 text-purple-300 border-purple-500/40",
                  "Proposal Sent": "bg-[#FF9933]/20 text-[#FF9933] border-[#FF9933]/40",
                  "Closed Won": "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
                  Disqualified: "bg-gray-800 text-gray-400 border-gray-700",
                };
                const cleanPhone = lead.phone ? lead.phone.replace(/[\s\-\(\)]/g, "") : "";

                return (
                  <div
                    key={`mobile-${lead.id}`}
                    className="p-4 rounded-2xl bg-[#0C0F17]/90 border border-white/10 space-y-3 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-white text-sm truncate">
                          {lead.fullName}
                        </h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-gray-500 shrink-0" />
                          <span className="truncate">{lead.companyName}</span>
                          <span className="text-gray-600">&middot;</span>
                          <span className="shrink-0">📍 {lead.city || "Bengaluru"}</span>
                        </p>
                      </div>

                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border outline-none cursor-pointer shrink-0 ${
                          statusColors[lead.status] || "bg-gray-800 text-gray-300"
                        }`}
                      >
                        <option value="New" className="bg-[#101420] text-white">New</option>
                        <option value="Contacted" className="bg-[#101420] text-white">Contacted</option>
                        <option value="In Review" className="bg-[#101420] text-white">In Review</option>
                        <option value="Proposal Sent" className="bg-[#101420] text-white">Proposal Sent</option>
                        <option value="Closed Won" className="bg-[#101420] text-white">Closed Won</option>
                        <option value="Disqualified" className="bg-[#101420] text-white">Disqualified</option>
                      </select>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-200 font-medium text-[11px]">
                        {lead.serviceCategory}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[11px]">
                        {lead.budgetRangeINR}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        ⏱ {lead.timeline}
                      </span>
                    </div>

                    <div className="pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone.replace("+", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                        <a
                          href={`mailto:${lead.email}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-[11px]"
                        >
                          <Mail className="w-3 h-3 text-[#E30613]" />
                          <span>Email</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setEditNotes(lead.internalNotes || "");
                          }}
                          className="p-1.5 rounded-lg bg-[#151924] hover:bg-[#1d2332] text-gray-300 hover:text-white border border-white/10"
                          title="View Brief & Add Notes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Desktop Table View (hidden on small screens, block on md+) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0D15] border-b border-white/10 text-gray-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Contact &amp; Company</th>
                  <th className="py-3.5 px-4">Service &amp; Location</th>
                  <th className="py-3.5 px-4">Budget &amp; Timeline</th>
                  <th className="py-3.5 px-4">Received (IST)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      No leads match your current search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const statusColors = {
                      New: "bg-blue-500/20 text-blue-300 border-blue-500/40",
                      Contacted: "bg-amber-500/20 text-amber-300 border-amber-500/40",
                      "In Review": "bg-purple-500/20 text-purple-300 border-purple-500/40",
                      "Proposal Sent": "bg-[#FF9933]/20 text-[#FF9933] border-[#FF9933]/40",
                      "Closed Won": "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
                      Disqualified: "bg-gray-800 text-gray-400 border-gray-700",
                    };

                    const cleanPhone = lead.phone ? lead.phone.replace(/[\s\-\(\)]/g, "") : "";

                    return (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        {/* Contact & Company */}
                        <td className="py-3.5 px-4">
                          <div>
                            <span className="font-bold text-white text-sm">
                              {lead.fullName}
                            </span>
                            <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mt-0.5">
                              <Building2 className="w-3 h-3 text-gray-500" />
                              <span>{lead.companyName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
                              <a href={`mailto:${lead.email}`} className="hover:text-white flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[#E30613]" />
                                <span>{lead.email}</span>
                              </a>
                              {cleanPhone && (
                                <a
                                  href={`https://wa.me/${cleanPhone.replace("+", "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400 hover:underline flex items-center gap-1"
                                  title="Chat on WhatsApp"
                                >
                                  <PhoneCall className="w-3 h-3" />
                                  <span>{lead.phone}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Service & City */}
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-gray-200">
                            {lead.serviceCategory}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            📍 {lead.city || "Bengaluru"} &middot; <span className="font-mono text-[10px]">{lead.source}</span>
                          </p>
                        </td>

                        {/* Budget & Timeline */}
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-emerald-400">
                            {lead.budgetRangeINR}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            ⏱ {lead.timeline}
                          </p>
                        </td>

                        {/* Date (IST) */}
                        <td className="py-3.5 px-4 text-gray-400 font-mono text-[11px]">
                          {new Date(lead.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })} IST
                        </td>

                        {/* Status dropdown */}
                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border outline-none cursor-pointer ${
                              statusColors[lead.status] || "bg-gray-800 text-gray-300"
                            }`}
                          >
                            <option value="New" className="bg-[#101420] text-white">New</option>
                            <option value="Contacted" className="bg-[#101420] text-white">Contacted</option>
                            <option value="In Review" className="bg-[#101420] text-white">In Review</option>
                            <option value="Proposal Sent" className="bg-[#101420] text-white">Proposal Sent</option>
                            <option value="Closed Won" className="bg-[#101420] text-white">Closed Won</option>
                            <option value="Disqualified" className="bg-[#101420] text-white">Disqualified</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setEditNotes(lead.internalNotes || "");
                              }}
                              className="p-1.5 rounded-lg bg-[#151924] hover:bg-[#1d2332] text-gray-300 hover:text-white border border-white/10"
                              title="View Brief & Add Notes"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Details & Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0D1017] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#E30613] bg-[#E30613]/10 px-2.5 py-0.5 rounded border border-[#E30613]/30">
                  REF: {selectedLead.id}
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">
                  {selectedLead.fullName} &middot; {selectedLead.companyName}
                </h3>
                <p className="text-xs text-gray-400">
                  Inquiry logged via {selectedLead.source}
                </p>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#131622] border border-white/5">
                <span className="text-gray-400 text-[10px]">Email Address</span>
                <p className="font-semibold text-white break-all">{selectedLead.email}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131622] border border-white/5">
                <span className="text-gray-400 text-[10px]">Phone / WhatsApp</span>
                <p className="font-semibold text-emerald-400">{selectedLead.phone}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131622] border border-white/5">
                <span className="text-gray-400 text-[10px]">Target Budget</span>
                <p className="font-bold text-emerald-400">{selectedLead.budgetRangeINR}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131622] border border-white/5">
                <span className="text-gray-400 text-[10px]">Service Scope</span>
                <p className="font-semibold text-white">{selectedLead.serviceCategory}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131622] border border-white/5">
                <span className="text-gray-400 text-[10px]">Target Timeline</span>
                <p className="font-semibold text-white">{selectedLead.timeline}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#131622] border border-white/5">
                <span className="text-gray-400 text-[10px]">Location Hub</span>
                <p className="font-semibold text-white">{selectedLead.city || "Bengaluru"}</p>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300">
                Client Project Summary / Requirements:
              </label>
              <div className="p-4 rounded-xl bg-[#090C12] border border-white/10 text-xs text-gray-200 leading-relaxed whitespace-pre-wrap">
                {selectedLead.projectDetails}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#FF9933] flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" />
                  Internal Tech Team Notes:
                </label>
                <span className="text-[10px] text-gray-400">
                  Shared across Ethixweb India directors
                </span>
              </div>

              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Add meeting notes, SLA quote shared, follow-up timeline, WhatsApp chat summary..."
                className="w-full rounded-xl bg-[#090C12] border border-white/10 p-3 text-xs text-white placeholder-gray-500 outline-none focus:border-[#E30613] resize-none"
              />

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(selectedLead.fullName.split(" ")[0])},%20following%20up%20from%20Ethixweb%20India%20regarding%20your%20project%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/40 border border-emerald-500/40 text-xs font-bold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp Client</span>
                </a>

                <button
                  type="button"
                  disabled={isSavingNote}
                  onClick={handleSaveNotes}
                  className="btn-primary inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingNote ? "Saving..." : "Save Internal Notes"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
