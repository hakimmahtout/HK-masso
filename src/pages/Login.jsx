import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import AuthShell from "../components/auth/AuthShell";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useLogin } from "../features/authentication/useLogin";
import { SEO } from "../components/ui/SEO";

export default function Login() {
  const [email, setEmail] = useState("lucas.martin@example.com");
  const [password, setPassword] = useState("pass1234");

  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <>
      <SEO
        title="Sign In | HK Masso Dashboard"
        description="Sign in to your HK Masso admin account to manage bookings, schedules, and services."
      />

      <AuthShell
        title="Sign in"
        description="Enter your credentials to access the admin dashboard."
      >
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@studio.com"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-muted-foreground hover:text-primary text-xs font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={isPending}
            />
          </div>

          <Button
            type="submit"
            className="h-11 rounded-md w-full flex items-center justify-center gap-2"
            disabled={isPending}
          >
            Sign in
            {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          </Button>
        </form>
      </AuthShell>
    </>
  );
}
