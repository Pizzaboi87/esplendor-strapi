import { RecoverPassword } from "@/components/pages/RecoverPassword";
import { mergeOpenGraph } from "@/utils/mergeMetaData";
import { Metadata } from "next";

const RecoverPasswordPage = () => <RecoverPassword />;

export default RecoverPasswordPage;

export const metadata: Metadata = {
  title: "Password Recovery",
  description: "Enter your email address to recover your password.",
  openGraph: mergeOpenGraph({
    title: "Password Recovery",
    url: "/recover-password",
  }),
};
