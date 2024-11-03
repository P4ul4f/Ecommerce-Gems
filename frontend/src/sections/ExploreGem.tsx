import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import eye from "@/assets/eye.png";
import Image from "next/image";

export const ExploreGem = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative"
          style={{ backgroundImage: `url(${starsBg.src})` }}
        >
          <div
            className="absolute inset-0 bg-[rgb(74,32,137)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_30%,black,transparent)]"
            style={{ backgroundImage: `url(${gridLines.src})` }}
          ></div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">
              Discover Our Collection
            </h2>
            <p className="text-center text-lg md:text-xl max-w-xs mx-auto text-white/70 px-4 mt-5 tracking-tight">
              Each gemstone is a piece of art, meticulously crafted to bring
              elegance and charm to your collection.
            </p>
          </div>
          <div className="flex justify-center mt-5">
          <Button href="/products">
              <Image
                src={eye}
                alt="User"
                className="h-8 w-8 relative"
                width={25}
                height={25}
              ></Image>
            </Button>
        </div> 
        </div>
      </div>
    </section>
  );
};
