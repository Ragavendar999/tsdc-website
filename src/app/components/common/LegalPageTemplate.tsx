import Link from 'next/link'
import type { LegalPage } from '@/app/lib/legalPages'

export default function LegalPageTemplate({ page }: { page: LegalPage }) {
  return (
    <section className="site-section-bg section-alt-clean section-divider min-h-[calc(100vh-5rem)] px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex rounded-full border-[3px] border-[#10163a] bg-white px-4 py-2 text-sm font-black text-[#3244b5] shadow-[4px_4px_0_#10163a] transition hover:-translate-y-0.5"
        >
          Back to home
        </Link>

        <div className="mt-8 overflow-hidden rounded-[2.4rem] border-[3px] border-[#10163a] bg-white shadow-[9px_9px_0_#10163a]">
          <div className="bg-[#3244b5] p-7 text-white md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ffcb53]">{page.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">{page.title}</h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-white/84">{page.description}</p>
          </div>

          <div className="grid gap-4 p-5 md:p-8">
            {page.sections.map((section) => (
              <article key={section.heading} className="rounded-[1.6rem] border-[3px] border-[#10163a] bg-[#fffdf7] p-5 shadow-[5px_5px_0_#10163a] md:p-6">
                <h2 className="text-xl font-black text-[#081225]">{section.heading}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#344054] md:text-base">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
