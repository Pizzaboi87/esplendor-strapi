import { PasswordReset } from "@/components/pages/PasswordReset";
import { mergeOpenGraph } from "@/utils/mergeMetaData";
import { Metadata } from "next";

const PaswordResetPage = () => <PasswordReset />;

export const metadata: Metadata = {
  title: "Password Reset",
  description: "Reset your password to restore your Esplendor Rings account.",
  openGraph: mergeOpenGraph({
    title: "Password Reset",
    url: "/password-reset",
  }),
};

export default PaswordResetPage;
