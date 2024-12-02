"use client";

import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button, TextArea } from "../common";
import { useRef } from "react";
import { useScrollToTop } from "@/utils/useScrollToTop";
import { SwalMessage } from "../common/SwalMessage";
import { FormValues } from "@/types/types";

export const Contact = () => {
  useScrollToTop();
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  // Function to send email using EmailJS
  const onSubmit: SubmitHandler<FormValues> = async () => {
    try {
      if (!formRef.current) return;

      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_KEY as string);
      await emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
          formRef.current
        )
        .then(() => {
          SwalMessage({
            title: "Message Sent",
            message:
              "Thank you for reaching out to us. We'll get back to you soon.",
          });
        })
        .then(() => {
          reset();
        });
    } catch (error) {
      console.log("Error during email sending: ", error);
      SwalMessage({
        title: "Something went wrong",
        message:
          "An error occurred while sending the email. Please try again later.",
      });
    }
  };

  return (
    <div className="flex flex-col xl:mx-0 lg:mx-32 xl:grid grid-cols-12 sm:gap-x-10 rounded-tl-2xl rounded-br-2xl overflow-hidden">
      <div className="col-span-6 pb-10">
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white sm:p-12 p-6 shadow-md rounded-tl-2xl h-full"
        >
          <h5 className="font-bold text-center xs:mb-6 mb-2 xs:text-[1.5rem]">
            Get in Touch!
          </h5>
          <p className="text-center mb-6 xs:text-[1rem] text-[0.8rem]">
            We&apos;d love to hear from you. Please fill out the form below.
          </p>
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Your name"
            register={register("name", {
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Name must be less than 50 characters",
              },
            })}
            error={errors.name}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Your email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            error={errors.email}
            className="mt-4"
          />
          <TextArea
            id="message"
            label="Message"
            placeholder="Your message"
            register={register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
            error={errors.message}
            className="mt-4"
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="mt-6 xl:w-1/2 w-full"
          >
            Send Message
          </Button>
        </form>
      </div>
      <div className="w-full h-full col-span-6 pb-10">
        <Image
          src="/assets/images/contact.webp"
          alt="Contact Us"
          width={800}
          height={800}
          priority
          className="xl:h-full xl:w-auto w-full h-auto rounded-br-xl shadow-md"
        />
      </div>
    </div>
  );
};
