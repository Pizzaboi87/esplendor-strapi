import { SignIn } from "@/components/pages/SignIn";

const SignInPage = () => <SignIn />;

export default SignInPage;

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Esplendor account.",
  openGraph: {
    title: "Sign In",
    url: "/sign-in",
  },
};
