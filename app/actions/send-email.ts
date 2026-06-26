"use server";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS environment variables are missing.");
    return { error: "Email service is currently misconfigured. Please try again later." };
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        },
        ...(privateKey ? { accessToken: privateKey } : {}),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("EmailJS Error Response:", errorText);
      return { error: "Failed to send message. Please try again later." };
    }

    return { success: "Message sent successfully!" };
  } catch (err) {
    console.error("Server Error:", err);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
