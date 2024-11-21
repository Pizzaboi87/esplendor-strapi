import Image from "next/image";

export const Loading = () => (
  <div className="flex items-center justify-center w-full flex-col gap-y-5 pt-12">
    <Image
      src="/assets/images/loading.webp"
      alt="Loading"
      width={400}
      height={400}
      priority
      className="w-[18rem] h-[18rem] animate-loadingSpinner"
    />
    <h1 className="font-bonheur_royale font-light tracking-widest">
      loading...
    </h1>
  </div>
);
