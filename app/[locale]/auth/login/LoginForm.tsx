"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

type Labels = { email: string; password: string; submit: string };

export function LoginForm({ labels }: { labels: Labels }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label className="mb-2 block text-sm" htmlFor="email">
          {labels.email}
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full border border-[color:var(--color-border)] bg-transparent px-3 text-base outline-none focus:border-[color:var(--color-sepia)]"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm" htmlFor="password">
          {labels.password}
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 w-full border border-[color:var(--color-border)] bg-transparent px-3 text-base outline-none focus:border-[color:var(--color-sepia)]"
        />
      </div>
      {error && <p className="text-sm text-[color:var(--color-terracotta)]">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "…" : labels.submit}
      </Button>
    </form>
  );
}
