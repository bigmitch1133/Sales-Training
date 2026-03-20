import { NextRequest } from "next/server";
import { getSessionEmail, isAdmin } from "@/lib/auth";
import { getAllProgress } from "@/lib/store";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });
  const email = getSessionEmail(token);
  if (!email) return Response.json({ error: "Invalid session" }, { status: 401 });

  if (!isAdmin(email)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return Response.json(getAllProgress());
}
