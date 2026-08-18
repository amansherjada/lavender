import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { appendSheetRow } from "@/lib/googleSheets";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: Request) {
  const body = await request.json();
  const { turnstileToken, ...formFields } = body;

  const remoteIp = request.headers.get("cf-connecting-ip") ?? undefined;
  const humanVerified =
    typeof turnstileToken === "string" &&
    (await verifyTurnstileToken(turnstileToken, remoteIp));
  if (!humanVerified) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(formFields);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot: bots fill in every field, including this hidden one. Real users
  // never see it. Pretend success so bots don't learn they were caught.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await appendSheetRow([
      new Date().toISOString(),
      data.first_name,
      data.last_name,
      data.email,
      data.phone,
      "",
      "General Inquiry",
      "",
      "",
      "",
      "",
      "",
      "",
      data.gdpr_consent ? "Yes" : "No",
      "lavenderuae.com – Contact Page",
      data.subject,
      data.message,
    ]);
  } catch (error) {
    console.error("Failed to write contact submission to Google Sheet:", error);
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
