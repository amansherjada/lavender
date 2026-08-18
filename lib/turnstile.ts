// Server-only. Verifies a Cloudflare Turnstile token before trusting a
// form submission — this is what actually stops bots, the honeypot just
// catches the lazy ones.

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body }
  );

  if (!res.ok) return false;
  const result = (await res.json()) as { success: boolean };
  return result.success;
}
