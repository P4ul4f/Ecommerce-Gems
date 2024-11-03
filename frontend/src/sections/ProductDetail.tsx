"use client";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Product } from "@/types/product";
import starsBg from "@/assets/stars.png";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductShowcase } from "./ProductShowcase";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { dispatch } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  if (!dispatch) {
    console.log("dispatch no disponible en el contexto!");
  }

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const cartItem = {
        ...product,
        quantity: 1,
      };
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    } else {
      window.location.href = "/register";
    }
  };

 // Función para renderizar las estrellas de acuerdo al rating
const renderStars = (rating: number) => {
  const fullStars = Math.round(rating); // Redondea el rating
  const starsArray = Array(5).fill(null).map((_, index) => (
    index < fullStars ? (
      <FaStar key={index} className="text-white" />
    ) : (
      <FaRegStar key={index} className="text-white" />
    )
  ));

  return starsArray;
};


  return (
    <motion.section
      className="pt-24 flex flex-col justify-center"
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
      <div
        className="container flex flex-col md:flex-row items-center justify-center mx-auto h-full border border-white rounded-xl py-16"
        style={{
          boxShadow:
            "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)",
        }}
      >
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            className="h-80 w-full object-cover rounded-lg mb-4"
            width={400} // Ajusta el ancho y alto según lo que necesites
            height={400}
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left md:ml-10 tracking-tighter">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-white/50">{product.description}</p>
          <div className="mt-2 text-lg text-white/60 flex gap-2">
            Rating: {renderStars(product.rating)}
            <span className="ml-2">({product.numReview} reviews)</span>
          </div>
          <p className="mt-2 text-lg text-white/60">
            In Stock: {product.countInStock}
          </p>
          <p className="mt-2 text-xl font-semibold text-white">
            Price: ${product.price}
          </p>
          <div
            className="flex justify-center md:justify-start mt-6"
            onClick={handleAddToCart}
          >
            <Button href="#">Buy Now</Button>
          </div>
        </div>
      </div>
      <ProductShowcase />
    </motion.section>
  );
};

export default ProductDetails;
