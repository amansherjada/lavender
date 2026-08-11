import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/schemas";
import { appendSheetRow } from "@/lib/googleSheets";

export async function POST(request: Request) {
  const body = await request.json();
  const { source, ...formFields } = body;
  const parsed = inquirySchema.safeParse(formFields);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    await appendSheetRow([
      new Date().toISOString(),
      data.first_name,
      data.last_name,
      data.email,
      data.mobile,
      data.user_type,
      data.inquiry_type,
      data.property_type,
      data.location,
      data.min_size ?? "",
      data.max_price ?? "",
      data.beds ?? "",
      data.baths ?? "",
      data.gdpr_consent ? "Yes" : "No",
      typeof source === "string" ? source : "",
    ]);
  } catch (error) {
    console.error("Failed to write inquiry to Google Sheet:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
