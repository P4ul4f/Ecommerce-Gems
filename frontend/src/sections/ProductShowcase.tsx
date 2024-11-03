import starsBg from "@/assets/stars.png";
import { Button } from "@/components/Button"; 

export const ProductShowcase = () => {
  return (
    <section className="p-5 w-full">
      <div
        className="relative w-full h-full"
        style={{
          backgroundImage: `url(${starsBg.src})`,
          backgroundSize: 'cover', // Ensures the image covers the entire background
          backgroundPosition: 'center', // Centers the image
          minHeight: '400px', // Sets a minimum height to ensure visibility
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center p-4">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-white">
              Committed to Sustainability
            </h2>
            <p className="text-lg md:text-xl text-white/70 mt-4 tracking-tight max-w-xl mx-auto">
              We are dedicated to sourcing materials responsibly, promoting eco-friendly practices, and supporting local communities to protect our planet for future generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

