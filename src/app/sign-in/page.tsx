import { SignIn } from "@/components/pages/SignIn";

const SignInPage = () => <SignIn />;

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Esplendor Rings account.",
  openGraph: {
    title: "Sign In",
    url: "/sign-in",
  },
};

export default SignInPage;
