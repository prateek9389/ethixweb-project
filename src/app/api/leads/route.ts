import { NextRequest, NextResponse } from "next/server";
import { createLead, getAllLeads, getDatabaseProvider } from "@/lib/db";
import { checkRateLimit } from "@/lib/rateLimit";
import { verifyToken } from "@/lib/auth";

// Indian 10-digit mobile phone regex (starts with 6, 7, 8, or 9, optional +91 or 0 prefix)
const INDIAN_PHONE_REGEX = /^(?:\+91[\-\s]?)?[0]?(?:[6789]\d{9})$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    
    // Check if requester is authenticated Admin
    const tokenCookie = req.cookies.get("ethix_admin_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const token = tokenCookie || authHeader;
    const isAdmin = token ? !!verifyToken(token) : false;

    // 1. Rate Limiting Check (bypass for Admin)
    if (!isAdmin) {
      const rateCheck = checkRateLimit(ip, 6, 15 * 60 * 1000);
      if (!rateCheck.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: "Too many submissions from this connection. Please try again in 15 minutes or WhatsApp our India desk directly.",
          },
          { status: 429 }
        );
      }
    }

    const body = await req.json();

    // 2. Anti-Spam: Honeypot trap check (bypass for Admin)
    if (!isAdmin) {
      if (body.company_website_url && body.company_website_url.trim().length > 0) {
        return NextResponse.json({ success: true, message: "Inquiry received." });
      }

      // 3. Anti-Spam: Submission speed check (< 1200ms is automated bot)
      if (body.formRenderTime && Date.now() - Number(body.formRenderTime) < 1200) {
        return NextResponse.json({ success: true, message: "Inquiry received." });
      }
    }

    // 4. Input Validation
    const {
      fullName,
      email,
      phone,
      companyName,
      serviceCategory,
      budgetRangeINR,
      timeline,
      projectDetails,
      city,
      source,
      status,
      priority,
      internalNotes,
    } = body;

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }

    // Clean phone number for validation
    const cleanPhone = phone ? phone.replace(/[\s\-\(\)]/g, "") : "";
    if (phone && !INDIAN_PHONE_REGEX.test(cleanPhone) && cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid contact number (10-digit Indian mobile or with +91)." },
        { status: 400 }
      );
    }

    const finalProjectDetails = projectDetails?.trim() || (isAdmin ? "Direct client inquiry logged via Ethixweb Admin Panel." : "");
    if (!finalProjectDetails || finalProjectDetails.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please share a brief summary of your project or requirements (min 10 characters)." },
        { status: 400 }
      );
    }

    // 5. Save lead
    const lead = await createLead({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      companyName: companyName?.trim() || "Not specified",
      serviceCategory: serviceCategory || "General Inquiry",
      budgetRangeINR: budgetRangeINR || "₹5L - ₹15L",
      timeline: timeline || "1 Month",
      projectDetails: finalProjectDetails,
      city: city || "Bengaluru",
      source: source || (isAdmin ? "Admin Portal - Direct Entry" : "Website - Inquiry Form"),
      status: (isAdmin && status) ? status : "New",
      priority: (isAdmin && priority) ? priority : undefined,
      internalNotes: internalNotes || "",
      ipAddress: ip.split(",")[0].trim(),
    });

    return NextResponse.json({
      success: true,
      message: isAdmin 
        ? "Lead logged successfully in Ethixweb CRM." 
        : "Dhanyavaad! Your inquiry has been submitted. Our India technical director will reach out within 4 business hours.",
      data: {
        leadId: lead.id,
        status: lead.status,
        lead,
      },
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while saving your inquiry. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Check Admin Authentication
    const tokenCookie = req.cookies.get("ethix_admin_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const token = tokenCookie || authHeader;

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Please log in as an Ethixweb admin." },
        { status: 401 }
      );
    }

    const leads = await getAllLeads();
    const dbProvider = getDatabaseProvider();

    // Calculate quick stats
    const stats = {
      totalLeads: leads.length,
      newLeads: leads.filter((l) => l.status === "New").length,
      contactedLeads: leads.filter((l) => l.status === "Contacted").length,
      inReviewLeads: leads.filter((l) => l.status === "In Review").length,
      proposalSentLeads: leads.filter((l) => l.status === "Proposal Sent").length,
      closedWonLeads: leads.filter((l) => l.status === "Closed Won").length,
    };

    return NextResponse.json({
      success: true,
      data: {
        leads,
        stats,
        dbProvider,
      },
    });
  } catch (error) {
    console.error("Fetch leads error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}
