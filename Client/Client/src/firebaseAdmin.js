import admin from "firebase-admin";

function formatPrivateKey(key) {
  return key.replace(/\\n/g, "\n");
}
export function createFirebaseAdminApp(params) {
  const privateKey = formatPrivateKey(params.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL,
    storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
    privatekey: import.meta.env.VITE_FIREBASE_PRIVATE_KEY,
  };

  return createFirebaseAdminApp(params);
}
