import { redirect } from 'next/navigation'

export default function AdminMasterclassesPage() {
  redirect('/admin?tab=masterclasses')
}
