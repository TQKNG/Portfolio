import { contactSchema } from "../src/lib/contact-schema";

const recentRequests = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (recentRequests.get(key) || []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    recentRequests.set(key, recent);
    return true;
  }

  recent.push(now);
  recentRequests.set(key, recent);
  return false;
}

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  if (isRateLimited(getClientKey(request))) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const payload = await request.json();
    const result = contactSchema.safeParse(payload);

    if (!result.success) {
      return Response.json({ error: "Invalid form submission" }, { status: 400 });
    }

    const { name, email, message, website } = result.data;

    if (website) {
      return Response.json({ success: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      console.error("Contact email environment variables are not configured");
      return Response.json({ error: "Email service is unavailable" }, { status: 500 });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: "New portfolio contact message",
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      console.error("Resend request failed", { status: resendResponse.status });
      return Response.json({ error: "Unable to send message" }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
