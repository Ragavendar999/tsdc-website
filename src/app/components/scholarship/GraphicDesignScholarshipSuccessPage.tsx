import { CheckCircle2, Clock3, MessageCircle, Trophy } from 'lucide-react'
import Link from 'next/link'

export default function GraphicDesignScholarshipSuccessPage({
  name,
  slot,
}: {
  name: string
  slot: string
}) {

  return (
    <main className="min-h-screen bg-[#eef2f7] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-5xl rounded-[2.8rem] border-[3px] border-[#10163a] bg-white p-6 shadow-[10px_10px_0_#10163a] md:p-8">
        <div className="rounded-[2.3rem] border-[3px] border-[#10163a] bg-[#fff8ed] p-6 text-center shadow-[7px_7px_0_#10163a] md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#10163a] bg-[#16a34a] text-white shadow-[4px_4px_0_#10163a]">
            <CheckCircle2 size={30} />
          </div>

          <p className="mt-5 text-[11px] font-black uppercase tracking-[0.22em] text-[#3244b5]">Registration confirmed</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#10163a] md:text-6xl">
            {name}, your scholarship slot is booked.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-[#475467]">
            Your Rs 99 registration is completed. The team will now share the demo class and scholarship assessment details with you.
          </p>

          <div className="mt-6 grid gap-4 text-left md:grid-cols-3">
            <div className="rounded-[1.6rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[4px_4px_0_#10163a]">
              <div className="flex items-center gap-2 text-[#3244b5]">
                <Clock3 size={17} />
                <p className="text-sm font-black">Preferred demo slot</p>
              </div>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#10163a]">{slot}</p>
            </div>

            <div className="rounded-[1.6rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[4px_4px_0_#10163a]">
              <div className="flex items-center gap-2 text-[#3244b5]">
                <MessageCircle size={17} />
                <p className="text-sm font-black">Follow-up channel</p>
              </div>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#10163a]">WhatsApp and email instructions will be sent by TSDC admissions.</p>
            </div>

            <div className="rounded-[1.6rem] border-[3px] border-[#10163a] bg-white p-4 shadow-[4px_4px_0_#10163a]">
              <div className="flex items-center gap-2 text-[#3244b5]">
                <Trophy size={17} />
                <p className="text-sm font-black">Scholarship path</p>
              </div>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#10163a]">Attend the demo class, complete the assessment, and receive your scholarship result.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/917358116929"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-[#25d366] px-6 py-3.5 text-sm font-black text-white shadow-[5px_5px_0_#10163a]"
            >
              <MessageCircle size={16} />
              WhatsApp Admissions
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-[1rem] border-[3px] border-[#10163a] bg-white px-6 py-3.5 text-sm font-black text-[#10163a] shadow-[5px_5px_0_#10163a]"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
