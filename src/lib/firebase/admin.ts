import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

let firebaseAdminApp: App | null = null

const getFirebaseAdminApp = () => {
  if (firebaseAdminApp) return firebaseAdminApp
  if (getApps().length) {
    firebaseAdminApp = getApp()
    return firebaseAdminApp
  }

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase admin environment variables')
  }

  firebaseAdminApp = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
  })

  return firebaseAdminApp
}

export const getFirebaseAdminAuth = () => getAuth(getFirebaseAdminApp())
export const getFirebaseAdminDb = () => getFirestore(getFirebaseAdminApp())
export const getFirebaseAdminStorage = () => getStorage(getFirebaseAdminApp()).bucket()
