// Firebase Admin SDK — server-side only (API routes, server actions)
// Uses service account credentials stored in environment variables
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App;
let adminDb: Firestore;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // The service account JSON is stored as a base64-encoded string
  // in FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable
  const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!serviceAccountBase64) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is not set. " +
      "Please download your service account key from Firebase Console → " +
      "Project Settings → Service Accounts → Generate new private key, " +
      "then base64-encode the JSON file and add it to .env.local."
    );
  }

  const serviceAccount = JSON.parse(
    Buffer.from(serviceAccountBase64, "base64").toString("utf-8")
  );

  const cleanProjectId = (
    serviceAccount.project_id ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    "portfolio-d3f4c"
  ).trim();

  if (serviceAccount.project_id) {
    serviceAccount.project_id = serviceAccount.project_id.trim();
  }

  return initializeApp({
    credential: cert(serviceAccount),
    projectId: cleanProjectId,
  });
}

export function getAdminDb(): Firestore {
  if (!adminApp) {
    adminApp = getAdminApp();
  }
  if (!adminDb) {
    adminDb = getFirestore(adminApp);
  }
  return adminDb;
}
