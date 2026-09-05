import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { fetchSyncedProperties, KV_PROPERTIES_KEY } from "@/lib/propertyFinder";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.SYNC_SECRET}`;
  if (!process.env.SYNC_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const raw = await env.LISTINGS_KV.get(KV_PROPERTIES_KEY);
  if (!raw) {
    return NextResponse.json({ error: "No synced data yet" }, { status: 404 });
  }
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.SYNC_SECRET}`;
  if (!process.env.SYNC_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.PROPERTYFINDER_API_KEY?.trim();
  const apiSecret = process.env.PROPERTYFINDER_API_SECRET?.trim();
  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Property Finder credentials are not configured" },
      { status: 500 }
    );
  }

  try {
    const { properties, totalFetched, excludedNoPermit } = await fetchSyncedProperties(
      apiKey,
      apiSecret
    );

    const { env } = await getCloudflareContext({ async: true });
    await env.LISTINGS_KV.put(
      KV_PROPERTIES_KEY,
      JSON.stringify({ properties, syncedAt: new Date().toISOString() })
    );

    return NextResponse.json({
      ok: true,
      published: properties.length,
      totalFetched,
      excludedNoPermit,
    });
  } catch (error) {
    console.error("Property Finder sync failed:", error);
    return NextResponse.json(
      { error: "Sync failed", detail: String(error) },
      { status: 502 }
    );
  }
}
