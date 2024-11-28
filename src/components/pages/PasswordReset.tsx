"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/utils/globalApi";
import { Button, Input, Message } from "@/components/common";
import { useScrollToTop } from "@/utils/useScrollToTop";

type FormData = {
  password: string;
  passwordConfirmation: string;
};

const PasswordResetContent = () => {
  useScrollToTop();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!code) {
        setError("Invalid or missing code.");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        const result = await resetPassword(
          data.password,
          data.passwordConfirmation,
          code
        );

        if (result) {
          setSuccess("Password reset successfully. You can now log in.");
        } else {
          setError("Failed to reset password. Please try again.");
        }
      } catch (err) {
        console.error("Error resetting password:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [code]
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_45%] h-screen">
      <div className="hidden lg:block bg-cover bg-center bg-no-repeat bg-[url('/assets/images/reset.webp')]">
        <Link href="/" className="inline-block mt-12 ml-8">
          <Image
            src="/logo.png"
            alt="logo"
            width={250}
            height={25}
            priority
            className="w-auto h-auto"
          />
        </Link>
      </div>

      <Link
        href="/"
        className="absolute flex justify-self-center lg:hidden sm:mt-12 mt-3 mx-auto text-center"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={250}
          height={25}
          priority
          className="xs:w-auto w-[75%] h-auto xs:mx-0 mx-auto"
        />
      </Link>

      <div className="flex flex-col justify-center items-center p-1 md:p-8 lg:p-0 bg-cover bg-center bg-no-repeat bg-[url('/assets/images/reset.webp')] lg:bg-none">
        <div className="w-full max-w-xl xs:p-8 p-2 lg:bg-transparent bg-white bg-opacity-60 backdrop-blur-md rounded-lg md:shadow-none shadow-lg">
          <h5 className="font-bold text-center xs:mb-6 mb-2 xs:text-[1.5rem]">
            Reset Your Password
          </h5>
          <p className="text-center xs:mb-12 mb-6 xs:text-[1rem] text-[0.8rem]">
            Enter your new password to restore access to your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {error && <Message message={error} type="error" />}
            {success && <Message message={success} type="success" />}

            <Input
              id="password"
              label="New Password"
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
              error={errors.password}
            />
            <Input
              id="passwordConfirmation"
              label="Confirm Password"
              type="password"
              register={register("passwordConfirmation", {
                required: "Password confirmation is required",
              })}
              error={errors.passwordConfirmation}
            />
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className="xl:w-1/2 w-full"
            >
              Reset Password
            </Button>
          </form>

          <div className="flex xs:flex-row flex-col gap-y-6 justify-start gap-x-2 mt-6">
            <p className="text-[0.9375rem]">Did you reset your password?</p>
            <Link
              href="/sign-in"
              className="text-black hover:underline underline-offset-8 text-[0.9375rem]"
            >
              Sign-in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Dynamically load the PasswordResetContent component
export const PasswordReset = dynamic(
  () => Promise.resolve(PasswordResetContent),
  {
    ssr: false,
  }
);
