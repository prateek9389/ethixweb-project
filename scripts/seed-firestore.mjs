import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

const firebaseConfig = {
  apiKey: "AIzaSyBNnnLVwBnHrUpO8LehUQoKqL50ZbQ6ZbA",
  authDomain: "ethixweb-a6cea.firebaseapp.com",
  projectId: "ethixweb-a6cea",
  storageBucket: "ethixweb-a6cea.firebasestorage.app",
  messagingSenderId: "944430755652",
  appId: "1:944430755652:web:7d90e95148db360bd23111",
  measurementId: "G-617M05JD20"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read leads from .data/leads.json
const dataPath = path.join(process.cwd(), ".data", "leads.json");
const leads = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

console.log(`Starting Firestore sync for ${leads.length} enterprise Indian leads to project: ethixweb-a6cea...`);

async function seed() {
  let successCount = 0;
  for (const lead of leads) {
    try {
      const docRef = doc(db, "leads", lead.id);
      await setDoc(docRef, lead, { merge: true });
      console.log(`✅ [Firestore Synced] ${lead.id} - ${lead.fullName} (${lead.companyName}) -> Status: ${lead.status}`);
      successCount++;
    } catch (err) {
      console.error(`❌ [Firestore Error] Failed for ${lead.id}:`, err.message || err);
    }
  }

  console.log(`\n🎉 Seeding complete! Successfully seeded ${successCount}/${leads.length} leads directly into Cloud Firestore.`);
  process.exit(0);
}

seed().catch(err => {
  console.error("Fatal Seeding Exception:", err);
  process.exit(1);
});
