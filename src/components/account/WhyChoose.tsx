import Image from "next/image";

export const WhyChoose = () => {
  const GemIcon = () => (
    <Image
      src="/assets/icons/gem.svg"
      alt="Gem Icon"
      width={24}
      height={24}
      priority
    />
  );

  const reasons = [
    {
      title: "Exquisite Craftsmanship",
      description:
        "Each piece is a masterpiece, meticulously designed to perfection.",
      icon: <GemIcon />,
    },
    {
      title: "Premium Materials",
      description:
        "Only the finest metals and gemstones make it into our collections.",
      icon: <GemIcon />,
    },
    {
      title: "Timeless Elegance",
      description:
        "Our designs transcend trends, ensuring they remain as stunning as the day you chose them.",
      icon: <GemIcon />,
    },
    {
      title: "Unparalleled Customer Care",
      description:
        "From selection to delivery, we're dedicated to making your journey exceptional.",
      icon: <GemIcon />,
    },
  ];

  return (
    <div className="mb-12">
      <h5 className="font-bold mb-6">Why Choose Us?</h5>
      <div className="bg-white rounded-tl-2xl rounded-br-2xl shadow-lg p-4 sm:p-6 md:p-10">
        <p className="xl:text-center mb-8">
          At <span className="font-semibold">Esplend&apos;or</span>, we believe
          in celebrating life&apos;s most precious moments with unmatched
          elegance and quality. Here&apos;s why discerning customers choose us:
        </p>
        <ul className="grid gap-6 xl:grid-cols-2">
          {reasons.map(({ title, description, icon }) => (
            <li
              key={title}
              className="flex items-start space-x-4 bg-gray-50 p-4 rounded-tl-xl rounded-br-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">{icon}</div>
              <div>
                <h5 className="cursor-default text-lg font-semibold mb-1">
                  {title}
                </h5>
                <p className="cursor-default">{description}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-center mt-10">
          Choose <span className="font-semibold">Esplend&apos;or</span> and let
          us make your dreams sparkle. ✨
        </p>
      </div>
    </div>
  );
};
