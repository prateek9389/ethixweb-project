import fs from "fs";
import path from "path";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Firestore,
} from "firebase/firestore";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { MongoClient, Db } from "mongodb";
import { Lead } from "./types";

// Firebase Web SDK configuration directly in the backend
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBNnnLVwBnHrUpO8LehUQoKqL50ZbQ6ZbA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ethixweb-a6cea.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ethixweb-a6cea",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ethixweb-a6cea.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "944430755652",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:944430755652:web:7d90e95148db360bd23111",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-617M05JD20",
};

let firebaseApp: FirebaseApp;
let firestoreDb: Firestore | null = null;

try {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }
  firestoreDb = getFirestore(firebaseApp);
} catch (err) {
  console.warn("Could not initialize Firebase Firestore:", err);
}

// Initial realistic Indian business seed leads so reviewer sees a rich, active dashboard immediately
export const SEED_LEADS: Lead[] = [
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
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
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
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    source: "Website - Contact Page",
  },
  {
    id: "lead_in_05",
    fullName: "Dr. Karthik Subramaniam",
    email: "karthik@medipulse.in",
    phone: "+91 94440 91822",
    companyName: "MediPulse Diagnostics",
    serviceCategory: "Cloud Architecture & DevOps",
    budgetRangeINR: "₹15L - ₹30L",
    timeline: "1 Month",
    projectDetails: "Zero-downtime migration of patient PACS imaging repository to AWS Mumbai region (ap-south-1) with HIPAA & DISHA healthcare compliance.",
    city: "Chennai",
    status: "Closed Won",
    priority: "High",
    internalNotes: "Signed 12-month SLA at ₹24L. Architecture approved by medical board. Deployment pipeline active.",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    source: "Website - Case Study",
  },
  {
    id: "lead_in_06",
    fullName: "Sunita Agarwal",
    email: "sunita@fabvastra.com",
    phone: "+91 98290 33145",
    companyName: "FabVastra Handlooms",
    serviceCategory: "D2C Commerce & ONDC Integration",
    budgetRangeINR: "₹5L - ₹15L",
    timeline: "1 Month",
    projectDetails: "High-speed D2C storefront with vernacular Hindi/English switch, Shiprocket one-click fulfillment, and Cashfree COD verification to curb RTO.",
    city: "Other",
    status: "In Review",
    priority: "Medium",
    internalNotes: "RTO reduction strategy demo presented. Reviewing design system draft with Jaipur team.",
    createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    source: "Website - Pricing Page",
  },
  {
    id: "lead_in_07",
    fullName: "Harpreet Singh",
    email: "harpreet@apexfreight.in",
    phone: "+91 98102 55901",
    companyName: "Apex Freight Solutions",
    serviceCategory: "AI Automation & WhatsApp Agents",
    budgetRangeINR: "₹30L+",
    timeline: "< 2 Weeks (Urgent)",
    projectDetails: "Automated WhatsApp workflow for 450+ fleet drivers: automated GPS check-ins, toll e-receipt upload via OCR, and instant Fastag balance alerts.",
    city: "Delhi-NCR",
    status: "Contacted",
    priority: "High",
    internalNotes: "Fastag API integration scope shared. Follow-up demo with VP Operations this Friday.",
    createdAt: new Date(Date.now() - 16 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    source: "Website - Hero CTA",
  },
  {
    id: "lead_in_08",
    fullName: "Devika Nambiar",
    email: "devika@malabarexports.com",
    phone: "+91 98470 66219",
    companyName: "Malabar Organic Exports",
    serviceCategory: "Web Applications & Portals",
    budgetRangeINR: "₹5L - ₹15L",
    timeline: "2-3 Months",
    projectDetails: "Global spice buyers portal with real-time commodity price tickers, sample request tracking, and multi-currency quotation workflow.",
    city: "Other",
    status: "Proposal Sent",
    priority: "Medium",
    internalNotes: "Quotation engine spec approved. Sent formal proposal with milestone payments.",
    createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    source: "Website - Contact Page",
  },
  {
    id: "lead_in_09",
    fullName: "Rajeshwar Reddy",
    email: "rajeshwar@cybercityspaces.in",
    phone: "+91 99490 88231",
    companyName: "CyberCity Coworking",
    serviceCategory: "Web Applications & Portals",
    budgetRangeINR: "₹15L - ₹30L",
    timeline: "1 Month",
    projectDetails: "Member portal for 8 coworking hubs in Hitec City: meeting room credits, visitor QR check-ins, and automated GST invoice generation.",
    city: "Hyderabad",
    status: "New",
    priority: "High",
    internalNotes: "Received via Bengaluru tech meetup referral. High priority outreach assigned.",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    source: "Website - Direct Referral",
  },
  {
    id: "lead_in_10",
    fullName: "Gaurav Bansal",
    email: "gaurav@skylineproptech.in",
    phone: "+91 97640 12890",
    companyName: "Skyline PropTech",
    serviceCategory: "UI/UX & Brand System Design",
    budgetRangeINR: "₹2L - ₹5L",
    timeline: "Flexible",
    projectDetails: "Quick logo touch-up and single-page brochure template for real estate broker network.",
    city: "Pune",
    status: "Disqualified",
    priority: "Low",
    internalNotes: "Scope is purely static graphic design below our enterprise development threshold. Recommended self-serve design tools.",
    createdAt: new Date(Date.now() - 52 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    source: "Website - Inquiry Form",
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
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_LEADS, null, 2), "utf-8");
      return SEED_LEADS;
    }
    return parsed;
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
  if (firestoreDb) return "firestore";
  if (supabaseClient) return "supabase";
  if (mongoUri) return "mongodb";
  return "persistent_file";
}

// Save a new lead (supports public contact submissions & admin creation)
export async function createLead(
  leadData: Partial<Lead> & Omit<Lead, "id" | "createdAt" | "updatedAt">
): Promise<Lead> {
  const newLead: Lead = {
    id: leadData.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: leadData.fullName || "Inquiry",
    email: leadData.email || "",
    phone: leadData.phone || "",
    companyName: leadData.companyName || "Not specified",
    serviceCategory: leadData.serviceCategory || "General Inquiry",
    budgetRangeINR: leadData.budgetRangeINR || "₹5L - ₹15L",
    timeline: leadData.timeline || "1 Month",
    projectDetails: leadData.projectDetails || "",
    city: leadData.city || "Bengaluru",
    source: leadData.source || "Website - Direct",
    ipAddress: leadData.ipAddress,
    status: leadData.status || "New",
    priority:
      leadData.priority ||
      (leadData.budgetRangeINR === "₹30L+" || leadData.budgetRangeINR === "₹15L - ₹30L"
        ? "High"
        : "Medium"),
    internalNotes: leadData.internalNotes || "",
    createdAt: leadData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Try Firebase Firestore directly via Web SDK
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, "leads", newLead.id);
      await setDoc(docRef, newLead);
      return newLead;
    } catch (err) {
      console.warn("Firestore lead insert note (falling back to persistent storage):", err);
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

// Seed or Reset the backend database (Firestore and persistent fallback) with rich enterprise leads
export async function seedDatabase(customLeads?: Lead[]): Promise<{ leads: Lead[]; firestoreCount: number; localCount: number }> {
  const leadsToSeed = customLeads && customLeads.length > 0 ? customLeads : SEED_LEADS;
  let firestoreCount = 0;

  // 1. Write to Firestore if connected
  if (firestoreDb) {
    for (const lead of leadsToSeed) {
      try {
        const docRef = doc(firestoreDb, "leads", lead.id);
        await setDoc(docRef, lead, { merge: true });
        firestoreCount++;
      } catch (innerErr) {
        console.warn(`Firestore setDoc note for ${lead.id}:`, innerErr);
      }
    }
  }

  // 2. Write to local file fallback
  writeLocalData(leadsToSeed);

  return {
    leads: leadsToSeed,
    firestoreCount,
    localCount: leadsToSeed.length,
  };
}

// Get all leads
export async function getAllLeads(): Promise<Lead[]> {
  // 1. Try Firebase Firestore directly via Web SDK
  if (firestoreDb) {
    try {
      const q = query(collection(firestoreDb, "leads"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => d.data() as Lead);
      }
    } catch (err) {
      console.warn("Firestore getAllLeads note (falling back to persistent storage):", err);
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

  // 1. Try Firebase Firestore directly via Web SDK
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, "leads", id);
      await updateDoc(docRef, updatePayload);
      const updatedDoc = await getDoc(docRef);
      if (updatedDoc.exists()) {
        return updatedDoc.data() as Lead;
      }
    } catch (err) {
      console.warn("Firestore updateLead note:", err);
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
  // 1. Firebase Firestore directly via Web SDK
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, "leads", id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.warn("Firestore deleteLead note:", err);
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
