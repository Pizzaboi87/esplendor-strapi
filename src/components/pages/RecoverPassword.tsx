"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, Input, Message } from "@/components/common";
import { sendForgotPasswordEmail } from "@/utils/globalApi";
import { SwalMessage } from "../common/SwalMessage";
import { useScrollToTop } from "@/utils/useScrollToTop";

type FormData = {
  email: string;
};

export const RecoverPassword: React.FC = () => {
  useScrollToTop();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  // Submit the form
  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        setError(null);

        // Send the password recovery email
        const isSuccess = await sendForgotPasswordEmail(data.email);

        if (isSuccess) {
          SwalMessage({
            title: "Password Recovery Email",
            message:
              "An email has been sent to your email address with instructions to recover your password.",
          }).then(() => {
            router.push("/");
          });
        } else {
          setError(
            "An error occurred while sending the password recovery email. Please try again."
          );
        }
      } catch (error) {
        console.error("Error during password recovery:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    },
    [router]
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_45%] h-screen">
      <div className="hidden lg:block bg-cover bg-center bg-no-repeat bg-[url('/assets/images/recover.webp')]">
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

      <div className="flex flex-col justify-center items-center p-1 md:p-8 lg:p-0 bg-cover bg-center bg-no-repeat bg-[url('/assets/images/recover.webp')] lg:bg-none">
        <div className="w-full max-w-xl xs:p-8 p-2 lg:bg-transparent bg-white bg-opacity-60 backdrop-blur-md rounded-lg md:shadow-none shadow-lg">
          <h5 className="font-bold text-center xs:mb-6 mb-2 xs:text-[1.5rem]">
            Recover your Password
          </h5>
          <p className="text-center xs:mb-12 mb-6 xs:text-[1rem] text-[0.8rem]">
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
              className="xl:w-1/2 w-full"
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
