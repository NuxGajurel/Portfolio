"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return { error: "Email service is currently misconfigured. Please try again later." };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["nuxgajurel46@gmail.com"],
      subject: `New Message from ${name}: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #111;">
          <h2 style="margin-bottom: 20px;">New Message from Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="margin-top: 4px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: "Failed to send message. Please try again later." };
    }

    return { success: "Message sent successfully!" };
  } catch (err) {
    console.error("Server Error:", err);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
