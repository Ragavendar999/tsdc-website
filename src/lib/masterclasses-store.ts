import 'server-only'

import { defaultMasterclasses, type Masterclass } from '@/app/lib/masterclasses'
import { getFirebaseAdminDb } from '@/lib/firebase/admin'

const COLLECTION_NAME = 'site_content'
const DOCUMENT_ID = 'masterclasses'

const isMasterclassRecord = (value: unknown): value is Masterclass =>
  typeof value === 'object' && value !== null && 'id' in value && 'slug' in value && 'status' in value && 'title' in value

export const getStoredMasterclasses = async () => {
  try {
    const db = getFirebaseAdminDb()
    const snapshot = await db.collection(COLLECTION_NAME).doc(DOCUMENT_ID).get()
    const items = snapshot.data()?.items

    if (!Array.isArray(items)) return defaultMasterclasses

    const masterclasses = items.filter(isMasterclassRecord) as Masterclass[]
    return masterclasses.length ? masterclasses : defaultMasterclasses
  } catch (error) {
    console.error('[masterclasses-store] Firebase read error — falling back to defaults:', error)
    return defaultMasterclasses
  }
}

export const saveStoredMasterclasses = async (masterclasses: Masterclass[]) => {
  const db = getFirebaseAdminDb()
  // Strip undefined values — Firestore rejects documents containing undefined fields
  const sanitized = JSON.parse(JSON.stringify(masterclasses)) as Masterclass[]
  await db
    .collection(COLLECTION_NAME)
    .doc(DOCUMENT_ID)
    .set(
      {
        items: sanitized,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )

  return masterclasses
}
