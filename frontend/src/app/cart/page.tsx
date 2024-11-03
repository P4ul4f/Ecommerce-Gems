
import React from "react";
import { Header } from "@/sections/Header";
import { Cart } from "@/sections/Cart";
import { Footer } from "@/sections/Footer";
import starsBg from "@/assets/stars.png";

const CartPage = () => {
  return (
    <>
      <Header />
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url(${starsBg.src})`,
        }}
      
      >
        <Cart />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
