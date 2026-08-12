import 'server-only'

import { defaultMasterclassPageContent, defaultMasterclasses, type Masterclass, type MasterclassPageContent } from '@/app/lib/masterclasses'
import { getFirebaseAdminDb } from '@/lib/firebase/admin'

const COLLECTION_NAME = 'site_content'
const DOCUMENT_ID = 'masterclasses'
const PAGE_CONTENT_DOCUMENT_ID = 'masterclasses-page'

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

export const getMasterclassPageContent = async (): Promise<MasterclassPageContent> => {
  try {
    const db = getFirebaseAdminDb()
    const snapshot = await db.collection(COLLECTION_NAME).doc(PAGE_CONTENT_DOCUMENT_ID).get()
    const content = snapshot.data()?.content

    if (!content || typeof content !== 'object') return defaultMasterclassPageContent

    return {
      heroStats: Array.isArray(content.heroStats) ? content.heroStats : defaultMasterclassPageContent.heroStats,
      whyAttend: Array.isArray(content.whyAttend) ? content.whyAttend : defaultMasterclassPageContent.whyAttend,
      testimonials: Array.isArray(content.testimonials) ? content.testimonials : [],
    }
  } catch (error) {
    console.error('[masterclasses-store] Firebase read error (page content) — falling back to defaults:', error)
    return defaultMasterclassPageContent
  }
}

export const saveMasterclassPageContent = async (content: MasterclassPageContent) => {
  const db = getFirebaseAdminDb()
  const sanitized = JSON.parse(JSON.stringify(content)) as MasterclassPageContent
  await db
    .collection(COLLECTION_NAME)
    .doc(PAGE_CONTENT_DOCUMENT_ID)
    .set(
      {
        content: sanitized,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )

  return content
}
