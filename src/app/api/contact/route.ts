import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    // IMPORTANT: Load key INSIDE POST (runtime)
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("❌ Missing RESEND_API_KEY in Vercel runtime");
      return NextResponse.json(
        { error: "API key missing on server" },
        { status: 500 }
      );
    }

    // Initialize resend NOW (not at file top)
    const resend = new Resend(apiKey);

    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const interest = formData.get("interest");
    const message = formData.get("message");

    const data = await resend.emails.send({
      from: "TSDC <onboarding@resend.dev>",
      to: "n.ragavendar@gmail.com",
      subject: `New Enrollment from ${name}`,
      html: `
        <h2>New Student Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Interested In:</strong> ${interest}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("❌ RESEND ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
