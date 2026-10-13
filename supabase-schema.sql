-- =========================================================================
-- Ethixweb India - Supabase / PostgreSQL Leads Table Schema
-- Run this in your Supabase SQL Editor if connecting a live Supabase project
-- =========================================================================

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  "companyName" TEXT,
  "serviceCategory" TEXT,
  "budgetRangeINR" TEXT,
  timeline TEXT,
  "projectDetails" TEXT NOT NULL,
  city TEXT,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Review', 'Proposal Sent', 'Closed Won', 'Disqualified')),
  priority TEXT DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  "internalNotes" TEXT,
  "ipAddress" TEXT,
  source TEXT DEFAULT 'Website - Inquiry Form',
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Index for speedy admin searches & status filters
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous insert for enquiry forms (with validation)
CREATE POLICY "Allow public insert on leads" 
  ON leads FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Allow service role full management
CREATE POLICY "Allow service role full access" 
  ON leads FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);
