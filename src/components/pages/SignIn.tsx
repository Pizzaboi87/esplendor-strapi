"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, Input, Message } from "@/components/common";
import { useUser } from "@/providers/User";
import { userLogin } from "@/utils/globalApi";
import { useScrollToTop } from "@/utils/useScrollToTop";

type FormData = {
  email: string;
  password: string;
};

export const SignIn = () => {
  useScrollToTop();
  const { login } = useUser();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Form submit function
  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await userLogin(data.email, data.password);

        if (typeof result === "string") {
          setError(result);
          setIsLoading(false);
          return;
        }

        login(result);
        setIsLoading(false);

        router.push("/");
      } catch (err) {
        console.error("Login error:", err);
        setError(
          "There was an error with the credentials provided. Please try again."
        );
        setIsLoading(false);
      }
    },
    [login, router]
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_45%] h-screen">
      <div className="hidden lg:block bg-cover bg-center bg-no-repeat bg-[url('/assets/images/login.webp')]">
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

      <div className="flex flex-col justify-center items-center p-1 md:p-8 lg:p-0 bg-cover bg-center bg-no-repeat bg-[url('/assets/images/login.webp')] lg:bg-none">
        <div className="w-full max-w-xl xs:p-8 p-2 lg:bg-transparent bg-white bg-opacity-60 backdrop-blur-md rounded-lg md:shadow-none shadow-lg">
          <h5 className="font-bold text-center xs:mb-6 mb-2 xs:text-[1.5rem]">
            Welcome to our Webshop!
          </h5>
          <p className="text-center xs:mb-12 mb-6 xs:text-[1rem] text-[0.8rem]">
            Please sign in to your Esplend&apos;or Account.
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
            <Input
              id="password"
              label="Password"
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
              error={errors.password}
            />
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className="xl:w-1/2 w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="flex sm:flex-row flex-col gap-y-6 justify-between mt-6 text-[0.9375rem]">
            <Link
              href="/recover-password"
              className="text-black hover:underline underline-offset-8"
            >
              Forgot your password?
            </Link>
            <Link
              href="/sign-up"
              className="text-black hover:underline underline-offset-8"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
