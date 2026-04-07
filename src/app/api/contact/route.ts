import { NextResponse } from "next/server";
import { Resend } from "resend";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const enquiryRecipient = process.env.CONTACT_TO_EMAIL || "n.ragavendar@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "TSDC <onboarding@resend.dev>";

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY in runtime");
      return NextResponse.json({ error: "API key missing on server" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const formData = await req.formData();

    const getValue = (key: string) => {
      const value = formData.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const name = getValue("name");
    const email = getValue("email");
    const mobile = getValue("mobile");
    const interest = getValue("interest");
    const source = getValue("source");
    const message = getValue("message");
    const occupation = getValue("occupation");
    const joiningTimeline = getValue("joiningTimeline");
    const appointmentDate = getValue("appointmentDate");
    const appointmentTime = getValue("appointmentTime");
    const isImmediateJoiner = joiningTimeline.toLowerCase() === "immediately";
    const couponCode = "TSDC2000";
    const couponExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const safeName = escapeHtml(name || "-");
    const safeEmail = escapeHtml(email || "-");
    const safeMobile = escapeHtml(mobile || "-");
    const safeInterest = escapeHtml(interest || "General enquiry");
    const safeOccupation = escapeHtml(occupation || "-");
    const safeJoiningTimeline = escapeHtml(joiningTimeline || "-");
    const safeAppointmentDate = escapeHtml(appointmentDate || "-");
    const safeAppointmentTime = escapeHtml(appointmentTime || "-");
    const safeSource = escapeHtml(source || "website");
    const safeMessage = escapeHtml(message || "-").replace(/\n/g, "<br>");

    const data = await resend.emails.send({
      from: fromEmail,
      to: enquiryRecipient,
      subject: `New Website Enquiry from ${name || "Website Visitor"}`,
      html: `
        <h2>New Student Enquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Mobile:</strong> ${safeMobile}</p>
        <p><strong>Interested In:</strong> ${safeInterest}</p>
        <p><strong>Occupation:</strong> ${safeOccupation}</p>
        <p><strong>Joining Timeline:</strong> ${safeJoiningTimeline}</p>
        <p><strong>Preferred Appointment:</strong> ${safeAppointmentDate} ${safeAppointmentTime}</p>
        <p><strong>Instant Discount Eligible:</strong> ${isImmediateJoiner ? "Yes - Rs. 2,000 coupon sent" : "No"}</p>
        <p><strong>Source:</strong> ${safeSource}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `,
    });

    if (isImmediateJoiner && email) {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Your TSDC Rs. 2,000 Instant Admission Discount Coupon",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#081225">
            <h2 style="margin:0 0 12px;color:#4562b0">Your TSDC instant discount is ready</h2>
            <p>Hi ${safeName},</p>
            <p>Thank you for enquiring about <strong>${safeInterest}</strong> at TSDC - Traijo Skill Development Center.</p>
            <p>Because you selected <strong>Immediately</strong> as your joining plan, you are eligible for an instant admission discount.</p>
            <div style="margin:22px 0;padding:20px;border-radius:18px;background:#fff4eb;border:1px solid #ffd5b8">
              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#9a4a10;text-transform:uppercase;letter-spacing:.08em">Coupon Code</p>
              <p style="margin:0;font-size:32px;font-weight:900;color:#fa8a43">${couponCode}</p>
              <p style="margin:10px 0 0;font-size:15px;color:#344054">Use this coupon to claim <strong>Rs. 2,000 off</strong> when you confirm admission within 24 hours.</p>
            </div>
            <p><strong>Coupon valid until:</strong> ${couponExpiresAt} IST</p>
            <p>Our admissions team will contact you soon. You can also reply to this email with your preferred appointment time.</p>
            <p>Regards,<br><strong>TSDC Admissions Team</strong></p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("RESEND ERROR:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
