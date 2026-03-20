import { NextRequest } from "next/server";
import { isValidLogin, isAdmin, createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!isValidLogin(email, password)) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSession(email);
  const res = Response.json({
    ok: true,
    email: email.toLowerCase(),
    isAdmin: isAdmin(email),
  });

  // Set HttpOnly cookie
  const headers = new Headers(res.headers);
  headers.append(
    "Set-Cookie",
    `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`
  );

  return new Response(res.body, { status: 200, headers });
}
