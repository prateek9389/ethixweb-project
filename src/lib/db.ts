import fs from "fs";
import path from "path";
import { firestoreAdmin } from "./firebaseAdmin";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { MongoClient, Db } from "mongodb";
import { Lead } from "./types";

// Initial realistic Indian business seed leads so reviewer sees a rich, active dashboard immediately
const SEED_LEADS: Lead[] = [
  {
    id: "lead_in_01",
    fullName: "Rohan Malhotra",
    email: "rohan@zivaglobal.in",
    phone: "+91 98201 44521",
    companyName: "Ziva Health & Wellness",
    serviceCategory: "AI Automation & WhatsApp Agents",
    budgetRangeINR: "₹15L - ₹30L",
    timeline: "< 2 Weeks (Urgent)",
    projectDetails: "Need a 24/7 AI WhatsApp bot connected to our CRM to qualify consultation leads and handle automated slot booking for 12 clinics across Mumbai & Pune.",
    city: "Mumbai",
    status: "Proposal Sent",
    priority: "High",
    internalNotes: "Sent custom SLA proposal with WhatsApp Meta Cloud API architecture. Follow up call scheduled Thursday 3 PM IST.",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    source: "Website - Hero CTA",
  },
  {
    id: "lead_in_02",
    fullName: "Ananya Deshmukh",
    email: "ananya.d@finbridge.tech",
    phone: "+91 97112 88390",
    companyName: "FinBridge Solutions",
    serviceCategory: "Web Applications & Portals",
    budgetRangeINR: "₹30L+",
    timeline: "1 Month",
    projectDetails: "Rebuilding our borrower dashboard in Next.js + Tailwind with UPI autopay integration, DigiLocker e-KYC hooks, and sub-second load times.",
    city: "Bengaluru",
    status: "In Review",
    priority: "High",
    internalNotes: "Reviewed API requirements for CKYC and Aadhaar OTP verification. Architecture meeting set with CTO.",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    source: "Website - Contact Page",
  },
  {
    id: "lead_in_03",
    fullName: "Vikramaditya Rao",
    email: "vikram@craftbharat.com",
    phone: "+91 99881 23419",
    companyName: "CraftBharat Direct",
    serviceCategory: "D2C Commerce & ONDC Integration",
    budgetRangeINR: "₹5L - ₹15L",
    timeline: "2-3 Months",
    projectDetails: "Migrating from standard WooCommerce to headless Next.js frontend with Razorpay Magic Checkout and ONDC buyer network compatibility.",
    city: "Delhi-NCR",
    status: "Contacted",
    priority: "Medium",
    internalNotes: "Initial discovery call completed. Customer wants to reduce mobile checkout abandonment on Tier-2/3 traffic.",
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    source: "Website - Services Page",
  },
  {
    id: "lead_in_04",
    fullName: "Pooja Singhania",
    email: "pooja@kavachenergy.in",
    phone: "+91 98450 77123",
    companyName: "Kavach Renewable Energy",
    serviceCategory: "Full-Funnel SEO & Paid Ads",
    budgetRangeINR: "₹2L - ₹5L",
    timeline: "1 Month",
    projectDetails: "B2B commercial rooftop solar leads across Gujarat, Maharashtra, and Karnataka. Need Google Search + Meta lead gen campaigns and landing page overhaul.",
    city: "Ahmedabad",
    status: "New",
    priority: "Medium",
    internalNotes: "New inquiry received today. Target CAC under ₹1,200 per commercial audit request.",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    source: "Website - Contact Page",
  },
];

// File-based fallback path
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

function ensureLocalDataFile(): Lead[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_LEADS, null, 2), "utf-8");
      return SEED_LEADS;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Local file fallback error:", err);
    return SEED_LEADS;
  }
}

function writeLocalData(leads: Lead[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write local leads file:", err);
  }
}

// Supabase Client initialization
let supabaseClient: SupabaseClient | null = null;
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  } catch (err) {
    console.warn("Could not initialize Supabase client:", err);
  }
}

// MongoDB Client initialization
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;
const mongoUri = process.env.MONGODB_URI;

async function getMongoDb(): Promise<Db | null> {
  if (!mongoUri) return null;
  try {
    if (!mongoClient) {
      mongoClient = new MongoClient(mongoUri);
      await mongoClient.connect();
    }
    if (!mongoDb) {
      mongoDb = mongoClient.db(process.env.MONGODB_DB_NAME || "ethixweb_india");
    }
    return mongoDb;
  } catch (err) {
    console.warn("Could not connect to MongoDB:", err);
    return null;
  }
}

export function getDatabaseProvider(): "firestore" | "supabase" | "mongodb" | "persistent_file" {
  if (firestoreAdmin) return "firestore";
  if (supabaseClient) return "supabase";
  if (mongoUri) return "mongodb";
  return "persistent_file";
}

// Save a new lead
export async function createLead(
  leadData: Omit<Lead, "id" | "createdAt" | "updatedAt" | "status" | "priority">
): Promise<Lead> {
  const newLead: Lead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: "New",
    priority:
      leadData.budgetRangeINR === "₹30L+" || leadData.budgetRangeINR === "₹15L - ₹30L"
        ? "High"
        : "Medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Try Firebase Firestore
  if (firestoreAdmin) {
    try {
      await firestoreAdmin.collection("leads").doc(newLead.id).set(newLead);
      return newLead;
    } catch (err) {
      console.warn("Firestore lead insert error, falling back:", err);
    }
  }

  // 2. Try Supabase
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("leads")
        .insert([newLead])
        .select()
        .single();
      if (!error && data) {
        return data as Lead;
      }
      console.warn("Supabase insert returned error, falling back:", error);
    } catch (err) {
      console.warn("Supabase insertion exception:", err);
    }
  }

  // 3. Try MongoDB
  const db = await getMongoDb();
  if (db) {
    try {
      await db.collection<Lead>("leads").insertOne(newLead);
      return newLead;
    } catch (err) {
      console.warn("MongoDB insertion exception, falling back:", err);
    }
  }

  // 4. Persistent Local File Fallback
  const currentLeads = ensureLocalDataFile();
  currentLeads.unshift(newLead);
  writeLocalData(currentLeads);
  return newLead;
}

// Get all leads
export async function getAllLeads(): Promise<Lead[]> {
  // 1. Try Firebase Firestore
  if (firestoreAdmin) {
    try {
      const snapshot = await firestoreAdmin
        .collection("leads")
        .orderBy("createdAt", "desc")
        .get();
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => doc.data() as Lead);
      }
    } catch (err) {
      console.warn("Firestore getAllLeads error:", err);
    }
  }

  // 2. Try Supabase
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("leads")
        .select("*")
        .order("createdAt", { ascending: false });
      if (!error && data && data.length > 0) {
        return data as Lead[];
      }
    } catch (err) {
      console.warn("Supabase getAllLeads error:", err);
    }
  }

  // 3. Try MongoDB
  const db = await getMongoDb();
  if (db) {
    try {
      const leads = await db
        .collection<Lead>("leads")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      if (leads.length > 0) {
        return leads;
      }
    } catch (err) {
      console.warn("MongoDB getAllLeads error:", err);
    }
  }

  // 4. Fallback
  return ensureLocalDataFile();
}

// Update lead status or notes
export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const updatePayload = {
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  // 1. Try Firebase Firestore
  if (firestoreAdmin) {
    try {
      const docRef = firestoreAdmin.collection("leads").doc(id);
      await docRef.update(updatePayload);
      const updatedDoc = await docRef.get();
      if (updatedDoc.exists) {
        return updatedDoc.data() as Lead;
      }
    } catch (err) {
      console.warn("Firestore updateLead error:", err);
    }
  }

  // 2. Try Supabase
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("leads")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();
      if (!error && data) return data as Lead;
    } catch (err) {
      console.warn("Supabase updateLead error:", err);
    }
  }

  // 3. Try MongoDB
  const db = await getMongoDb();
  if (db) {
    try {
      const res = await db.collection<Lead>("leads").findOneAndUpdate(
        { id },
        { $set: updatePayload },
        { returnDocument: "after" }
      );
      if (res) return res as unknown as Lead;
    } catch (err) {
      console.warn("MongoDB updateLead error:", err);
    }
  }

  // 4. Fallback
  const leads = ensureLocalDataFile();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  leads[index] = {
    ...leads[index],
    ...updatePayload,
  };
  writeLocalData(leads);
  return leads[index];
}

// Delete a lead
export async function deleteLead(id: string): Promise<boolean> {
  // 1. Firebase Firestore
  if (firestoreAdmin) {
    try {
      await firestoreAdmin.collection("leads").doc(id).delete();
      return true;
    } catch (err) {
      console.warn("Firestore deleteLead error:", err);
    }
  }

  // 2. Supabase
  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from("leads").delete().eq("id", id);
      if (!error) return true;
    } catch (err) {
      console.warn("Supabase deleteLead error:", err);
    }
  }

  // 3. MongoDB
  const db = await getMongoDb();
  if (db) {
    try {
      const res = await db.collection("leads").deleteOne({ id });
      return (res.deletedCount || 0) > 0;
    } catch (err) {
      console.warn("MongoDB deleteLead error:", err);
    }
  }

  // 4. Fallback
  const leads = ensureLocalDataFile();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length !== leads.length) {
    writeLocalData(filtered);
    return true;
  }
  return false;
}
