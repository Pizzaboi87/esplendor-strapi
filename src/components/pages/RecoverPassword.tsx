"use client";

import Link from "next/link";
import Image from "next/image";

import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Message } from "@/components/common";

type FormData = {
  email: string;
};

export const RecoverPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const redirect = useRef(searchParams.get("redirect"));
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        // TODO: Create a password recovery request
        console.log("Password recovery request for:", data.email);
        setError(null);

        router.push("/");
      } catch (_) {
        setError(
          "An error occurred while processing your request. Please try again."
        );
      }
    },
    [router]
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_45%] h-screen">
      <div className="hidden lg:block bg-cover bg-center bg-no-repeat bg-[url('/assets/images/recover.webp')]">
        <Link href="/" className="inline-block mt-12 ml-8">
          <Image src="/logo.png" alt="logo" width={250} height={25} />
        </Link>
      </div>

      <Link
        href="/"
        className="absolute flex justify-self-center lg:hidden mt-12 mx-auto text-center"
      >
        <Image src="/logo.png" alt="logo" width={250} height={25} />
      </Link>

      <div className="flex flex-col justify-center items-center p-1 md:p-8 lg:p-0 bg-cover bg-center bg-no-repeat bg-[url('/assets/images/recover.webp')] lg:bg-none">
        <div className="w-full max-w-xl p-8 lg:bg-transparent bg-white bg-opacity-60 backdrop-blur-md rounded-lg md:shadow-none shadow-lg">
          <h5 className="font-bold text-center mb-6 text-[1.5rem]">
            Recover your Password
          </h5>
          <p className="text-center mb-12">
            Please enter your email address to recover your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {error && <Message message={error} type="error" />}
            <Input
              id="email"
              label="Email Address"
              type="email"
              register={register("email", { required: "Email is required" })}
              error={errors.email}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Recover Password
            </Button>
          </form>

          <div className="flex xs:flex-row flex-col gap-y-6 justify-between mt-6 text-[0.9375rem]">
            <Link
              href="/sign-in"
              className="text-black hover:underline underline-offset-8"
            >
              <span>&#8678;</span> Back
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
