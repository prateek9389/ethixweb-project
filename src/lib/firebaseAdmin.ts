import * as admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;
const privateKey = rawPrivateKey ? rawPrivateKey.replace(/\\n/g, "\n") : undefined;

let firestoreAdmin: admin.firestore.Firestore | null = null;
let authAdmin: admin.auth.Auth | null = null;

export function isFirebaseAdminConfigured(): boolean {
  return Boolean(projectId && (clientEmail && privateKey || process.env.FIREBASE_CONFIG));
}

try {
  if (projectId) {
    if (!admin.apps.length) {
      if (clientEmail && privateKey) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });
      } else {
        // Fallback to project ID initialization (e.g. Google Cloud / Firebase Hosting)
        admin.initializeApp({ projectId });
      }
    }

    firestoreAdmin = admin.firestore();
    authAdmin = admin.auth();
  }
} catch (err) {
  console.warn("Firebase Admin initialization note:", err);
}

export { admin, firestoreAdmin, authAdmin };
