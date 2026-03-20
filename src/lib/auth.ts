const VALID_PASSWORD = "Eagle1!";

const ADMIN_EMAILS = [
  "mitchell@nationgraph.com",
  "josh@nationgraph.com",
  "kimia@nationgraph.com",
];

export function isValidLogin(email: string, password: string): boolean {
  return (
    email.toLowerCase().endsWith("@nationgraph.com") &&
    password === VALID_PASSWORD
  );
}

export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

// Simple in-memory session store
const sessions = new Map<string, string>(); // token -> email

export function createSession(email: string): string {
  const token = crypto.randomUUID();
  sessions.set(token, email.toLowerCase());
  return token;
}

export function getSessionEmail(token: string): string | null {
  return sessions.get(token) ?? null;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}
