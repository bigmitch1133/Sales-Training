import { NextRequest } from "next/server";
import { getSessionEmail } from "@/lib/auth";
import { getProgress, saveProgress } from "@/lib/store";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });
  const email = getSessionEmail(token);
  if (!email) return Response.json({ error: "Invalid session" }, { status: 401 });

  return Response.json(getProgress(email));
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });
  const email = getSessionEmail(token);
  if (!email) return Response.json({ error: "Invalid session" }, { status: 401 });

  const data = await request.json();
  const updated = saveProgress(email, data);
  return Response.json(updated);
}
