"use client";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import Image from "next/image";
import { motion } from "framer-motion";

const collections = [
  {
    text: "“The Amethyst I purchased is absolutely stunning. Its beauty and energy have completely enhanced my collection.”",
    name: "Sophia Perez",
    title: "Jewelry Enthusiast",
    avatarImg: avatar1,
  },
  {
    text: "“The Diamond's brilliance is breathtaking. The quality exceeded my expectations and has become my favorite piece.”",
    name: "Jamie Lee",
    title: "Event Curator",
    avatarImg: avatar2,
  },
  {
    text: "“Since buying the Rose Quartz, I feel a new sense of balance and serenity. The craftsmanship is exceptional.”",
    name: "Alisa Hester",
    title: "Gemstone Aficionado",
    avatarImg: avatar3,
  },
];

export const Testimonial = () => {
  return (
    <section id="testimonials" className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl text-center tracking-tighter font-medium">
          Customer Testimonials{" "}
        </h2>
        <p className="text-white/70 text-lg md:text-xl text-center mt-5 tracking-tigh max-w-sm mx-auto">
          Experience the elegance and allure of our gemstones through the words
          of our discerning clients.{" "}
        </p>
        <div className="overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{ translateX: "-50%" }}
            animate={{ translateX: "0" }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="flex gap-5 pr-5 flex-none -translate-x-1/2"
          >
            {collections.map((collection) => (
              <div
                key={collection.name}
                className="border border-white/15 p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,60,255,.3),black)] max-w-sm md:max-w-md flex-none"
              >
                <div className="text-lg tracking-tigh md:text-2xl ">
                  {collection.text}
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-[rgb(140,69,244)] after:mix-blend-soft-light before:content-[''] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-lg">
                    <Image
                      src={collection.avatarImg}
                      alt={`Avatar for ${collection.name}`}
                      className="h-11 w-11 rounded-lg grayscale"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div>{collection.name}</div>
                    <div className="text-white/50 text-sm">
                      {collection.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
