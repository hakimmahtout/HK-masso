import { Loader2 } from "lucide-react";
import Label from "../components/ui/Label";
import Input from "../components/ui/input";
import Button from "../components/ui/Button";
import AuthShell from "../components/auth/AuthShell";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../features/authentication/useSignUp";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

export default function SignUp() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ name, email, password, passwordConfirm }) {
    signup(
      { name, email, password, passwordConfirm },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <AuthShell
      title="Create account"
      description="Set up your admin access in a few seconds."
      footer={
        <span>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Alex Rivera"
            aria-invalid={Boolean(errors?.name?.message)}
            disabled={isPending}
            {...register("name", { required: "This field is required" })}
          />
          {errors?.name?.message && (
            <p className="text-destructive text-xs">{errors?.name?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@studio.com"
            aria-invalid={Boolean(errors?.email?.message)}
            disabled={isPending}
            {...register("email", { required: "This field is required" })}
          />
          {errors?.email?.message && (
            <p className="text-destructive text-xs">{errors?.email?.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
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
          <Label htmlFor="passwordConfirm">Confirm password</Label>
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
          className="h-11 rounded-md w-full flex items-center justify-center gap-2 "
          disabled={isPending}
        >
          Create account
          {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        </Button>
      </form>
    </AuthShell>
  );
}
