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

    // ✅ Setup mail transporter (Gmail or Hostinger SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // example: support@tsdc.in
        pass: process.env.EMAIL_PASS, // App password or SMTP pass
      },
    })

    // ✅ Prepare email
    const mailOptions = {
      from: `"TSDC Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Default to your email
      subject: `New Enquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Interested In:</strong> ${interest}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    }

    // ✅ Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false, message: 'Email failed', error: error.message }, { status: 500 })
  }
}
