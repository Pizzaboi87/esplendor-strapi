import { SignUp } from "@/components/pages/SignUp";
import { mergeOpenGraph } from "@/utils/mergeMetaData";
import { Metadata } from "next";

const SignUpPage = () => <SignUp />;

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an Esplendor Account to find the perfect ring.",
  openGraph: mergeOpenGraph({
    title: "Create Account",
    url: "/sign-up",
  }),
};

export default SignUpPage;
