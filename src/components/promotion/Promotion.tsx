import Image from "next/image";
import { Counter } from "./Counter";

export const Promotion = () => (
  <section className="container mx-auto normal md:grid md:grid-cols-12 flex flex-col my-24">
    <div className="md:col-span-6">
      <h3 className="mb-10">Deal of the Month</h3>
      <p className="leading-8 mb-10 font-light">
        <strong className="font-semibold">
          Discover the Deal of the Month at Esplend'or!
        </strong>{" "}
        This month only, explore our most exquisite wedding and engagement rings
        at exceptional prices. Make your special moments unforgettable with a
        ring that symbolizes eternity. Don't miss out - choose love, choose
        Esplend'or!
      </p>

      <div className="block md:hidden lg:block">
        <Counter />
      </div>
    </div>

    <div className="col-start-8 col-span-5 justify-self-end">
      <Image
        src="/assets/images/promo.webp"
        alt="Promotion"
        width={500}
        height={500}
        className="rounded-tl-[2rem] rounded-br-[2rem] w-full"
      />
    </div>

    <div className="hidden md:block lg:hidden col-span-12">
      <Counter />
    </div>
  </section>
);
