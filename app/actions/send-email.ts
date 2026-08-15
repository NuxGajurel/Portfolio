"use server";

import { Resend } from "resend";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !name.trim() || !email || !email.trim() || !subject || !subject.trim() || !message || !message.trim()) {
    return { error: "All fields are required." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return { error: "Email service is currently misconfigured. Please try again later." };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["nuxgajurel46@gmail.com"],
      replyTo: email,
      subject: `New Message from ${name}: ${subject}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; color: #111827;">
          <h2 style="margin-top: 0; color: #111827; font-size: 20px; font-weight: 600;">New Message from Portfolio Contact Form</h2>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="margin: 8px 0;"><strong>Message:</strong></p>
          <p style="margin-top: 8px; white-space: pre-wrap; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #f3f4f6; color: #374151;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: error.message || "Failed to send message. Please try again later." };
    }

    return { success: "Message sent successfully!" };
  } catch (err: any) {
    console.error("Server Error:", err);
    return { error: err?.message || "An unexpected error occurred. Please try again later." };
  }
}

