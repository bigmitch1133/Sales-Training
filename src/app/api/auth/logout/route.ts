import { NextRequest } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (token) deleteSession(token);

  const res = Response.json({ ok: true });
  const headers = new Headers(res.headers);
  headers.append(
    "Set-Cookie",
    "session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  );

  return new Response(res.body, { status: 200, headers });
}
