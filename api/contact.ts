import { contactSchema } from "../src/lib/contact-schema";

const recentRequests = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type VercelResponse = {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => void;
};

function getClientKey(request: VercelRequest) {
  const forwardedFor = request.headers["x-forwarded-for"];
  const value = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return value?.split(",")[0]?.trim() || "unknown";
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

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (isRateLimited(getClientKey(request))) {
    return response.status(429).json({ error: "Too many requests" });
  }

  try {
    const result = contactSchema.safeParse(
      typeof request.body === "string" ? JSON.parse(request.body) : request.body,
    );

    if (!result.success) {
      return response.status(400).json({ error: "Invalid form submission" });
    }

    const { name, email, message, website } = result.data;

    if (website) {
      return response.status(200).json({ success: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      console.error("Contact email environment variables are not configured");
      return response.status(500).json({ error: "Email service is unavailable" });
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
      const errorBody = await resendResponse.text();
      console.error("Resend request failed", {
        status: resendResponse.status,
        body: errorBody,
      });
      return response.status(502).json({ error: "Unable to send message" });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact function failed", error);
    return response.status(500).json({ error: "Unable to process message" });
  }
}
