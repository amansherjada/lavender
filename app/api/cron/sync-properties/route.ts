import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { KV_PROPERTIES_KEY } from "@/lib/properties";

// Debug/introspection only. The actual sync runs via
// scripts/sync-properties.mjs on a GitHub Actions schedule, writing
// directly to this KV namespace's REST API -- Property Finder's CDN
// blocks requests originating from Cloudflare's network, so the sync
// can't run from inside this Worker.
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
