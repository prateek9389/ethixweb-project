"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lead } from "@/lib/types";
import BrandLogo from "@/components/BrandLogo";
import { 
  Search, 
  Download, 
  RefreshCw, 
  LogOut, 
  Database, 
  PhoneCall, 
  Mail, 
  Building2, 
  CheckCircle2, 
  Filter, 
  IndianRupee, 
  Trash2, 
  Edit3, 
  Eye, 
  X, 
  Save, 
  Sparkles,
  ArrowUpRight,
  PlusCircle,
  Briefcase,
  MapPin,
  Clock,
  Send,
  Flame,
  Check
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [dbProvider, setDbProvider] = useState<string>("firestore");
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [cityFilter, setCityFilter] = useState<string>("ALL");
  const [budgetFilter, setBudgetFilter] = useState<string>("ALL");
  
  // Selected lead for detail/edit modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState<Lead["status"]>("New");
  const [editPriority, setEditPriority] = useState<Lead["priority"]>("Medium");
  const [isSavingLead, setIsSavingLead] = useState(false);

  // Add Lead Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [addLeadForm, setAddLeadForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceCategory: "AI Automation & WhatsApp Agents",
    budgetRangeINR: "₹15L - ₹30L",
    timeline: "1 Month",
    projectDetails: "",
    city: "Bengaluru",
    status: "New" as Lead["status"],
    priority: "High" as Lead["priority"],
    internalNotes: "",
  });

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
        setDbProvider(data.data.dbProvider || "firestore");
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

  // Seed demo leads to backend
  const handleSeedLeads = async () => {
    if (!confirm("This will synchronize 10 enterprise Indian business leads into Firebase & backend storage. Continue?")) {
      return;
    }
    setIsSeeding(true);
    try {
      const res = await fetch("/api/leads/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage(`Database seeded with ${data.data.totalSeeded} Indian business leads.`);
        await fetchLeads();
      } else {
        setActionMessage(data.error || "Failed to seed demo leads.");
      }
    } catch (err) {
      console.error("Seed error:", err);
      setActionMessage("Failed to connect to seed endpoint.");
    } finally {
      setIsSeeding(false);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  // Handle lead status change directly from dropdown
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
          setEditStatus(newStatus);
        }
        setActionMessage(`Status updated to "${newStatus}"`);
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Handle saving modal edits (notes, status, priority)
  const handleSaveModalEdits = async () => {
    if (!selectedLead) return;
    setIsSavingLead(true);

    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          internalNotes: editNotes,
          status: editStatus,
          priority: editPriority
        }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === selectedLead.id
              ? { ...l, internalNotes: editNotes, status: editStatus, priority: editPriority }
              : l
          )
        );
        setSelectedLead((prev) =>
          prev
            ? { ...prev, internalNotes: editNotes, status: editStatus, priority: editPriority }
            : null
        );
        setActionMessage("Lead record updated successfully.");
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to save lead updates:", err);
    } finally {
      setIsSavingLead(false);
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
        setActionMessage("Lead deleted successfully.");
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Handle creating new lead from modal
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addLeadForm.fullName.trim() || !addLeadForm.email.trim()) {
      alert("Please provide full name and email address.");
      return;
    }
    setIsSubmittingLead(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addLeadForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.data?.lead) {
          setLeads((prev) => [data.data.lead, ...prev]);
        } else {
          await fetchLeads();
        }
        setIsAddModalOpen(false);
        setActionMessage(`Lead "${addLeadForm.fullName}" added successfully.`);
        setAddLeadForm({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          serviceCategory: "AI Automation & WhatsApp Agents",
          budgetRangeINR: "₹15L - ₹30L",
          timeline: "1 Month",
          projectDetails: "",
          city: "Bengaluru",
          status: "New",
          priority: "High",
          internalNotes: "",
        });
      } else {
        alert(data.error || "Failed to create lead.");
      }
    } catch (err) {
      console.error("Add lead error:", err);
      alert("Failed to submit lead to backend.");
    } finally {
      setIsSubmittingLead(false);
      setTimeout(() => setActionMessage(null), 4000);
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
      "City",
      "Service",
      "Budget (INR)",
      "Timeline",
      "Status",
      "Priority",
      "Source",
      "Created At (UTC)",
      "Internal Notes",
      "Project Details",
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      `"${l.city || "Bengaluru"}"`,
      `"${l.serviceCategory.replace(/"/g, '""')}"`,
      `"${l.budgetRangeINR}"`,
      `"${l.timeline}"`,
      `"${l.status}"`,
      `"${l.priority}"`,
      `"${l.source}"`,
      `"${l.createdAt}"`,
      `"${(l.internalNotes || "").replace(/"/g, '""')}"`,
      `"${(l.projectDetails || "").replace(/"/g, '""')}"`,
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
      lead.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.internalNotes && lead.internalNotes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    const matchesCity = cityFilter === "ALL" || (lead.city || "Other") === cityFilter;
    const matchesBudget = budgetFilter === "ALL" || lead.budgetRangeINR === budgetFilter;

    return matchesSearch && matchesStatus && matchesCity && matchesBudget;
  });

  // Calculate statistics & pipeline value
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    inReview: leads.filter((l) => l.status === "In Review").length,
    proposalSent: leads.filter((l) => l.status === "Proposal Sent").length,
    closedWon: leads.filter((l) => l.status === "Closed Won").length,
    disqualified: leads.filter((l) => l.status === "Disqualified").length,
  };

  // Estimated pipeline value based on budget tiers
  const estimatedPipelineINR = leads.reduce((acc, lead) => {
    if (lead.status === "Disqualified") return acc;
    if (lead.budgetRangeINR === "₹30L+") return acc + 4000000;
    if (lead.budgetRangeINR === "₹15L - ₹30L") return acc + 2250000;
    if (lead.budgetRangeINR === "₹5L - ₹15L") return acc + 1000000;
    if (lead.budgetRangeINR === "₹2L - ₹5L") return acc + 350000;
    return acc + 500000;
  }, 0);

  const formatLakhsCrores = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(1)} Lakhs`;
  };

  const statusColors: Record<string, string> = {
    New: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    Contacted: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    "In Review": "bg-purple-500/20 text-purple-300 border-purple-500/40",
    "Proposal Sent": "bg-[#FF9933]/20 text-[#FF9933] border-[#FF9933]/40",
    "Closed Won": "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    Disqualified: "bg-gray-800 text-gray-400 border-gray-700",
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
                  v2.5 Enterprise
                </span>
              </h1>
              <p className="text-xs text-gray-400">
                Direct lead management &amp; pipeline operations for Ethixweb India Technical Directors
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

            {/* Add Lead button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg shadow-[#E30613]/20"
              title="Add New Lead Manually"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add Lead</span>
            </button>

            {/* Seed Demo Leads button */}
            <button
              onClick={handleSeedLeads}
              disabled={isSeeding}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-300 hover:bg-amber-500/25 transition-colors disabled:opacity-50"
              title="Seed 10 Enterprise Indian Leads into Firestore"
            >
              <Sparkles className={`w-3.5 h-3.5 text-amber-400 ${isSeeding ? "animate-spin" : ""}`} />
              <span>{isSeeding ? "Seeding..." : "Seed Demo Data"}</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121622] border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-[#1A2030] transition-colors"
              title="View Public Site"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Site</span>
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
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="font-medium">{actionMessage}</span>
          </div>
        )}

        {/* Stats Grid with Pipeline Valuation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-white/[0.02]">
            <p className="text-[11px] text-gray-400">Total Leads</p>
            <p className="text-2xl font-black text-white mt-1">{stats.total}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-emerald-500/20 bg-emerald-950/15">
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <IndianRupee className="w-3 h-3" />
              <span>Est. Pipeline</span>
            </p>
            <p className="text-2xl font-black text-emerald-300 mt-1">
              {formatLakhsCrores(estimatedPipelineINR)}
            </p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-blue-500/20 bg-blue-950/10">
            <p className="text-[11px] text-blue-300">New Inquiries</p>
            <p className="text-2xl font-black text-blue-400 mt-1">{stats.new}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-amber-500/20 bg-amber-950/10">
            <p className="text-[11px] text-amber-300">Contacted</p>
            <p className="text-2xl font-black text-amber-400 mt-1">{stats.contacted}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-purple-500/20 bg-purple-950/10">
            <p className="text-[11px] text-purple-300">In Review</p>
            <p className="text-2xl font-black text-purple-400 mt-1">{stats.inReview}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-[#FF9933]/20 bg-[#FF9933]/10">
            <p className="text-[11px] text-[#FF9933]">Proposal Sent</p>
            <p className="text-2xl font-black text-[#FF9933] mt-1">{stats.proposalSent}</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-950/20">
            <p className="text-[11px] text-emerald-300 font-semibold">Closed Won</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">{stats.closedWon}</p>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: "ALL", label: "All Leads", count: stats.total },
            { id: "New", label: "New", count: stats.new },
            { id: "Contacted", label: "Contacted", count: stats.contacted },
            { id: "In Review", label: "In Review", count: stats.inReview },
            { id: "Proposal Sent", label: "Proposal Sent", count: stats.proposalSent },
            { id: "Closed Won", label: "Closed Won", count: stats.closedWon },
            { id: "Disqualified", label: "Disqualified", count: stats.disqualified },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? "bg-[#E30613] text-white shadow-md shadow-[#E30613]/25"
                  : "bg-[#111420] text-gray-400 hover:text-white hover:bg-[#181D2E] border border-white/5"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                statusFilter === tab.id ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Multi-Filters Toolbar */}
        <div className="p-4 rounded-2xl glass-panel border border-white/5 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, company, email, phone, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#090B10] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#E30613]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* City filter */}
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
              <span>City:</span>
            </div>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-[#090B10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#E30613]"
            >
              <option value="ALL">All Cities</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi-NCR">Delhi-NCR</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
              <option value="Other">Other Cities</option>
            </select>

            {/* Budget filter */}
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
              <span>Budget:</span>
            </div>
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

            {(searchQuery || statusFilter !== "ALL" || cityFilter !== "ALL" || budgetFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("ALL");
                  setCityFilter("ALL");
                  setBudgetFilter("ALL");
                }}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] text-gray-300 hover:text-white"
              >
                Reset Filters
              </button>
            )}
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
                const cleanPhone = lead.phone ? lead.phone.replace(/[\s\-\(\)]/g, "") : "";

                return (
                  <div
                    key={`mobile-${lead.id}`}
                    className="p-4 rounded-2xl bg-[#0C0F17]/90 border border-white/10 space-y-3 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-white text-sm truncate">
                            {lead.fullName}
                          </h3>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            lead.priority === "High" ? "bg-red-500/20 text-red-400" : "bg-gray-700/50 text-gray-400"
                          }`}>
                            {lead.priority || "Medium"}
                          </span>
                        </div>
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

                    {lead.internalNotes && (
                      <p className="text-[11px] text-gray-400 bg-white/[0.03] p-2 rounded-lg border border-white/5 line-clamp-2">
                        <strong className="text-gray-300">Note:</strong> {lead.internalNotes}
                      </p>
                    )}

                    <div className="pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone.replace("+", "")}?text=Hi%20${encodeURIComponent(lead.fullName.split(" ")[0])},%20this%20is%20Ethixweb%20India%20following%20up%20on%20your%20project%20inquiry.`}
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
                            setEditStatus(lead.status);
                            setEditPriority(lead.priority || "Medium");
                          }}
                          className="p-1.5 rounded-lg bg-[#151924] hover:bg-[#1d2332] text-gray-300 hover:text-white border border-white/10"
                          title="View Brief & Edit Details"
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
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Received (IST)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No leads match your current search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
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
                                  href={`https://wa.me/${cleanPhone.replace("+", "")}?text=Hi%20${encodeURIComponent(lead.fullName.split(" ")[0])},%20this%20is%20Ethixweb%20India%20following%20up%20on%20your%20project%20inquiry.`}
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
                            📍 {lead.city || "Bengaluru"} &middot; <span className="font-mono text-[10px] text-gray-500">{lead.source}</span>
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

                        {/* Priority */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            lead.priority === "High"
                              ? "bg-red-500/15 text-red-400 border border-red-500/30"
                              : lead.priority === "Medium"
                              ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                              : "bg-gray-800 text-gray-400 border border-gray-700"
                          }`}>
                            {lead.priority || "Medium"}
                          </span>
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
                                setEditStatus(lead.status);
                                setEditPriority(lead.priority || "Medium");
                              }}
                              className="p-1.5 rounded-lg bg-[#151924] hover:bg-[#1d2332] text-gray-300 hover:text-white border border-white/10"
                              title="View Brief & Edit Details"
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

      {/* MODAL 1: Lead Details & Full Edit Modal */}
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
                  Inquiry logged via {selectedLead.source} &middot; Received {new Date(selectedLead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
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

            {/* Status & Priority Editors */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#131622] border border-white/5 space-y-1">
                <label className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">Change Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as Lead["status"])}
                  className="w-full bg-[#090C12] border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-[#E30613]"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Review">In Review</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Disqualified">Disqualified</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-[#131622] border border-white/5 space-y-1">
                <label className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">Priority Level</label>
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as Lead["priority"])}
                  className="w-full bg-[#090C12] border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-[#E30613]"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
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

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs transition-colors"
                  >
                    Delete Lead
                  </button>

                  <button
                    type="button"
                    disabled={isSavingLead}
                    onClick={handleSaveModalEdits}
                    className="btn-primary inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavingLead ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: + Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0D1017] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#E30613]" />
                  <span>Log New Client Lead</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Direct entry for inquiries received via phone call, event, or direct WhatsApp
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Contact Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={addLeadForm.fullName}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, fullName: e.target.value })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-[#E30613]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Tech India"
                    value={addLeadForm.companyName}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, companyName: e.target.value })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-[#E30613]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vikram@company.in"
                    value={addLeadForm.email}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, email: e.target.value })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-[#E30613]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Phone / WhatsApp (+91)</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={addLeadForm.phone}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, phone: e.target.value })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-[#E30613]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Service Category</label>
                  <select
                    value={addLeadForm.serviceCategory}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, serviceCategory: e.target.value })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#E30613]"
                  >
                    <option value="AI Automation & WhatsApp Agents">AI Automation & WhatsApp Agents</option>
                    <option value="Web Applications & Portals">Web Applications & Portals</option>
                    <option value="D2C Commerce & ONDC Integration">D2C Commerce & ONDC</option>
                    <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                    <option value="Full-Funnel SEO & Paid Ads">Full-Funnel SEO & Paid Ads</option>
                    <option value="UI/UX & Brand System Design">UI/UX & Brand Design</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Target Budget (INR)</label>
                  <select
                    value={addLeadForm.budgetRangeINR}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, budgetRangeINR: e.target.value })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#E30613]"
                  >
                    <option value="₹2L - ₹5L">₹2L - ₹5L</option>
                    <option value="₹5L - ₹15L">₹5L - ₹15L</option>
                    <option value="₹15L - ₹30L">₹15L - ₹30L</option>
                    <option value="₹30L+">₹30L+</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Target Hub / City</label>
                  <select
                    value={addLeadForm.city}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, city: e.target.value })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#E30613]"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi-NCR">Delhi-NCR</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Timeline</label>
                  <select
                    value={addLeadForm.timeline}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, timeline: e.target.value })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#E30613]"
                  >
                    <option value="< 2 Weeks (Urgent)">&lt; 2 Weeks (Urgent)</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2-3 Months">2-3 Months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Initial Status</label>
                  <select
                    value={addLeadForm.status}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, status: e.target.value as Lead["status"] })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#E30613]"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Review">In Review</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed Won">Closed Won</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-300">Priority</label>
                  <select
                    value={addLeadForm.priority}
                    onChange={(e) => setAddLeadForm({ ...addLeadForm, priority: e.target.value as Lead["priority"] })}
                    className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#E30613]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-300">Project Details / Requirements *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Summarize project requirements, client goals, and tech stack expectations..."
                  value={addLeadForm.projectDetails}
                  onChange={(e) => setAddLeadForm({ ...addLeadForm, projectDetails: e.target.value })}
                  className="w-full bg-[#090C12] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 outline-none focus:border-[#E30613] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-300">Internal Tech Team Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Referred by Rajiv from Hitec City; initial pitch deck shared"
                  value={addLeadForm.internalNotes}
                  onChange={(e) => setAddLeadForm({ ...addLeadForm, internalNotes: e.target.value })}
                  className="w-full bg-[#090C12] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-[#E30613]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="btn-primary inline-flex items-center gap-1.5 px-6 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-50"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isSubmittingLead ? "Saving..." : "Save Lead to Backend"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
