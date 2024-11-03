import React from "react";
import { Header } from "@/sections/Header";
import { Order } from "@/sections/Order";
import { Footer } from "@/sections/Footer";
import starsBg from "@/assets/stars.png";

const CartPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${starsBg.src})`,
        }}
     
      >
        <Order />
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
