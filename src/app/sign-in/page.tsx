import { SignIn } from "@/components/pages/SignIn";
import { mergeOpenGraph } from "@/utils/mergeMetaData";

const SignInPage = () => <SignIn />;

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Esplendor Rings account.",
  openGraph: mergeOpenGraph({
    title: "Sign In",
    url: "/sign-in",
  }),
};

export default SignInPage;
