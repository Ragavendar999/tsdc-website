import 'server-only'
import { getFirebaseAdminDb } from '@/lib/firebase/admin'

const COLLECTION = 'site_content'

export function createDocStore<T>(docId: string, defaultValue: T, isValid: (value: unknown) => value is T) {
  return {
    async get(): Promise<T> {
      try {
        const snapshot = await getFirebaseAdminDb().collection(COLLECTION).doc(docId).get()
        const value = snapshot.data()?.value
        return isValid(value) ? value : defaultValue
      } catch (error) {
        console.error(`[content-store:${docId}] read failed, using default:`, error)
        return defaultValue
      }
    },
    async save(value: T): Promise<T> {
      const sanitized = JSON.parse(JSON.stringify(value)) as T
      await getFirebaseAdminDb()
        .collection(COLLECTION)
        .doc(docId)
        .set({ value: sanitized, updatedAt: new Date().toISOString() }, { merge: true })
      return sanitized
    },
  }
}
