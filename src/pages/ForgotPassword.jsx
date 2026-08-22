import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import AuthShell from "../components/auth/AuthShell";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForgotPassword } from "../features/authentication/useForgotPassword";
import { SEO } from "../components/ui/SEO";

export default function ForgotPassword() {
  const { forgotPassword, isPending } = useForgotPassword();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) return;

    forgotPassword(
      { email },
      {
        onSuccess: () => {
          setSent(true);
        },
        onError: () => {
          setSent(false);
        },
      },
    );
  }

  return (
    <>
      <SEO
        title="Forgot Password | HK Masso"
        description="Reset your password for the HK Masso admin account."
      />

      <AuthShell
        title="Forgot password"
        description="We'll email you a secure link to reset your password."
        footer={
          <span>
            Remembered it?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Back to sign in
            </Link>
          </span>
        }
      >
        {sent ? (
          <div className="surface-card flex flex-col items-center gap-3 p-8 text-center">
            <div className="bg-success/15 text-success grid h-12 w-12 place-items-center rounded-2xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="font-display font-semibold">Check your email</p>
            <p className="text-muted-foreground text-sm">
              If an account exists for{" "}
              <span className="text-foreground font-medium">{email}</span>, a
              reset link is on its way.
            </p>
            <Button
              onClick={() => {
                setSent(false);
              }}
              variant="outline"
              className="mt-2"
            >
              Use a different email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
            </div>
            <Button
              type="submit"
              className="h-11 rounded-md w-full flex items-center justify-center gap-2"
              disabled={isPending}
            >
              Send reset link
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            </Button>
          </form>
        )}
      </AuthShell>
    </>
  );
}
