"use client";

import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";
  const redirect = useRef(searchParams.get("redirect"));
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>();

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        // Simulating login functionality
        console.log("Logging in with:", data);
        if (redirect?.current) router.push(redirect.current as string);
        else router.push("/");
      } catch (_) {
        setError(
          "There was an error with the credentials provided. Please try again."
        );
      }
    },
    [router]
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_45%] h-screen">
      <div className="hidden lg:block bg-cover bg-center bg-no-repeat bg-[url('/assets/images/login.webp')]">
        <Link href="/" className="inline-block mt-12 ml-12">
          <Image src="/logo.png" alt="logo" width={250} height={25} />
        </Link>
      </div>

      <Link
        href="/"
        className="absolute flex justify-self-center lg:hidden mt-12 mx-auto text-center"
      >
        <Image src="/logo.png" alt="logo" width={250} height={25} />
      </Link>

      <div className="flex flex-col justify-center items-center p-1 md:p-8 lg:p-0 bg-cover bg-center bg-no-repeat bg-[url('/assets/images/login.webp')] lg:bg-none">
        <div className="w-full max-w-xl p-8 lg:bg-transparent bg-white bg-opacity-60 backdrop-blur-md rounded-lg md:shadow-none shadow-lg">
          <h5 className="font-bold text-center mb-6 text-[1.5rem]">
            Welcome to our Webshop!
          </h5>
          <p className="text-center mb-12">
            Please sign in to your Esplend'or Account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email Address <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-[0.625rem] border border-gray-400 bg-gray-50 rounded-md focus:outline-none focus:border-black"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="pb-3">
              <label htmlFor="password" className="block text-sm mb-1">
                Password <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-3 py-[0.625rem] border border-gray-400 bg-gray-50 rounded-md focus:outline-none focus:border-black"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="md:w-1/2 w-full uppercase bg-black text-white py-[0.625rem] px-4 rounded-md hover:bg-black/80 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? "Processing" : "Sign In"}
            </button>
          </form>

          <div className="flex xs:flex-row flex-col gap-y-6 justify-between mt-6 text-[0.9375rem]">
            <Link
              href={`/recover-password${allParams}`}
              className="text-black hover:underline underline-offset-8"
            >
              Forgot your password?
            </Link>
            <Link
              href={`/create-account${allParams}`}
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

export default LoginPage;
