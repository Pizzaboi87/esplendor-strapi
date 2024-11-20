"use client";

import Link from "next/link";
import Image from "next/image";

import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Message } from "@/components/common";
import { createAccount } from "@/utils/globalApi";
import { RegisterForm } from "@/types/types";
import { useUser } from "@/providers/User";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

export const SignUp = () => {
  const { login } = useUser();
  const searchParams = useSearchParams();
  const redirect = useRef(searchParams.get("redirect"));
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Form submit function
  const onSubmit = useCallback(
    async (data: RegisterForm) => {
      if (data.password !== data.passwordRepeat) {
        setError("Passwords do not match. Please try again.");
        return;
      }

      setIsLoading(true);
      setError(null);

      const result = await createAccount(data);

      if (typeof result === "string") {
        setError(result);
        setIsLoading(false);
        return;
      }

      login(result);
      setIsLoading(false);

      redirect?.current
        ? router.push(redirect.current as string)
        : router.push("/");
    },
    [router, login]
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_45%] h-screen">
      <div className="hidden lg:block bg-cover bg-center bg-no-repeat bg-[url('/assets/images/create.webp')]">
        <Link href="/" className="inline-block mt-12 ml-8">
          <Image
            src="/logo-white.png"
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
        className="absolute flex justify-self-center lg:hidden mt-12 mx-auto text-center"
      >
        <Image
          src="/logo-white.png"
          alt="logo"
          width={250}
          height={25}
          priority
          className="xs:w-auto w-[75%] h-auto xs:mx-0 mx-auto"
        />
      </Link>

      <div className="flex flex-col justify-center items-center p-1 md:p-8 lg:p-0 bg-cover bg-center bg-no-repeat bg-[url('/assets/images/create.webp')] lg:bg-none">
        <div className="mt-12 sm:mt-0 w-full max-w-xl xs:p-8 p-2 lg:bg-transparent bg-white bg-opacity-60 backdrop-blur-md rounded-lg md:shadow-none shadow-lg">
          <h5 className="font-bold text-center xs:mb-6 mb-2 xs:text-[1.5rem]">
            Create your Esplend'or Account
          </h5>
          <p className="text-center xs:mb-12 mb-6 xs:text-[1rem] text-[0.8rem]">
            Please fill out the form below to create your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {error && <Message message={error} type="error" />}
            <Input
              id="fullName"
              label="Full Name"
              type="text"
              register={register("fullName", {
                required: "Full name is required",
              })}
              error={errors.fullName}
            />
            <Input
              id="email"
              label="Email Address"
              type="email"
              register={register("email", { required: "Email is required" })}
              error={errors.email}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
              error={errors.password}
            />
            <Input
              id="passwordRepeat"
              label="Repeat Password"
              type="password"
              register={register("passwordRepeat", {
                required: "Password repeat is required",
              })}
              error={errors.passwordRepeat}
            />
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className="xl:w-1/2 w-full"
            >
              Create Account
            </Button>
          </form>

          <div className="flex xs:flex-row flex-col gap-y-6 justify-start gap-x-2 mt-6">
            <p className="text-[0.9375rem]">Already have an account?</p>
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
