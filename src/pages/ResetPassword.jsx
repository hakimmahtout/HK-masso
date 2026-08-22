import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthShell from "../components/auth/AuthShell";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Button from "../components/ui/Button";
import { useResetPassword } from "../features/authentication/useResetPassword";
import { SEO } from "../components/ui/SEO";

export default function ResetPassword() {
  const { resetPassword, isPending } = useResetPassword();
  const { resetToken } = useParams();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ password, passwordConfirm }) {
    resetPassword(
      { password, passwordConfirm, resetToken },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <>
      <SEO
        title="Reset Password | HK Masso"
        description="Set a new secure password for your HK Masso admin account."
      />

      <AuthShell
        title="Reset password"
        description="Pick a strong new password for your account."
        footer={
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Back to sign in
          </Link>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors?.password?.message)}
              disabled={isPending}
              {...register("password", { required: "This field is required" })}
            />
            {errors?.password?.message && (
              <p className="text-destructive text-xs">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="passwordConfirm">Confirm new password</Label>
            <Input
              id="passwordConfirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors?.passwordConfirm?.message)}
              disabled={isPending}
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
            {errors?.passwordConfirm?.message && (
              <p className="text-destructive text-xs">
                {errors?.passwordConfirm?.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="h-11 rounded-md w-full flex items-center justify-center gap-2"
            disabled={isPending}
          >
            Update password{" "}
            {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          </Button>
        </form>
      </AuthShell>
    </>
  );
}
