// Firebase init for the public site.
//
// Reads live gallery items and contact settings from the same Firestore
// project the admin app (pli-admin) writes to. If no Firebase config is
// present (.env not set up yet), the site falls back to the static
// content in src/data/content.js — see src/lib/liveContent.js.
//
// Setup: copy .env.example to .env and fill in the Web App config from
// the Firebase console (Project settings → General → Your apps).

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const app = firebaseEnabled && !getApps().length ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
