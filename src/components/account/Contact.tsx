import { useRouter } from "next/navigation";
import { Button } from "../common";

export const Contact = () => {
  const router = useRouter();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <div className="bg-white rounded-tl-2xl rounded-br-2xl shadow-md p-6">
        <p className="mb-4">
          Need assistance or have questions? Our dedicated 24/7 customer service
          team is always here to provide you with seamless support. Reach out to
          us anytime - we&apos;re just a message away!
        </p>
        <Button
          type="button"
          className="w-full xs:w-auto mt-10"
          onClick={() => router.push("/contact")}
        >
          Contact Us
        </Button>
      </div>
    </>
  );
};
