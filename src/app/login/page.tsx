"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import NationGraphLogo from "@/components/NationGraphLogo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  // Already logged in
  if (user) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const err = await login(email.trim(), password);
    if (err) {
      setError(err);
      setSubmitting(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <NationGraphLogo size="large" />
          </div>
          <p className="text-gray-500 font-brand text-sm tracking-[0.2em] uppercase">
            SDR Training Program
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#141414] rounded-xl p-8 border border-[#2a2a2a]"
        >
          <h2 className="text-xl font-brand font-semibold text-white mb-6">
            Sign in
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/20 border border-red-800/40 text-red-400 text-sm font-brand">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-brand font-medium text-gray-400 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@nationgraph.com"
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white font-brand placeholder:text-gray-600 focus:border-[#1b5e20] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-brand font-medium text-gray-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white font-brand placeholder:text-gray-600 focus:border-[#1b5e20] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 py-3 bg-[#1b5e20] text-white rounded-lg font-brand font-medium hover:bg-[#14431a] disabled:opacity-50 transition-colors"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
