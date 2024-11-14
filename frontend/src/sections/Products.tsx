"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import Image from "next/image";
import starsBg from "@/assets/stars.png";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "@/constants/BASE_URL";
import { Spinner } from "@nextui-org/react";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        // La respuesta de axios se encuentra en res.data
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Spinner color="default" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <motion.section
      id="products"
      className="py-20 md:py-24 relative overflow-hidden "
      style={{
        backgroundImage: `url(${starsBg.src})`,
      }}
      animate={{
        backgroundPositionX: starsBg.width,
      }}
      transition={{
        duration: 120,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="container">
        <h2 className="text-5xl md:text-6xl text-center tracking-tighter font-medium">
          Our Featured Products
        </h2>
        <p className="text-center text-lg md:text-xl text-white/70 mt-5 tracking-tight max-w-md mx-auto">
          Discover our handpicked selection of the finest gemstones, showcasing
          exceptional beauty and craftsmanship.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-8 sm:gap-6 mt-10 text-center">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-white p-6 rounded-xl lg:max-h-[500px] mx-auto flex flex-col"
              style={{
                boxShadow:
                  "0 0 4px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)",
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={320}
                height={320}
                className="h-80 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-white">
                {product.name}
              </h3>
              <p className="text-white/70 mt-2">{product.description}</p>
              <div className="flex justify-center mt-4">
                <Button href={`/details/${product._id}`}>View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
