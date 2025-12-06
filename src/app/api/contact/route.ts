import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const mobile = formData.get('mobile') as string
    const interest = formData.get('interest') as string
    const message = formData.get('message') as string

    // ✅ GMAIL SMTP (WORKS ON VERCEL)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"TSDC Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Enquiry from ${name}`,
      html: `
        <h2>New Enrollment Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Course Interested:</strong> ${interest}</p>
        <p><strong>Message:</strong><br>${message || "No message provided"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Email failed", error: error.message },
      { status: 500 }
    );
  }
}
