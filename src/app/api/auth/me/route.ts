import { NextRequest } from "next/server";
import { getSessionEmail, isAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const email = getSessionEmail(token);
  if (!email) return Response.json({ error: "Invalid session" }, { status: 401 });

  return Response.json({ email, isAdmin: isAdmin(email) });
}
