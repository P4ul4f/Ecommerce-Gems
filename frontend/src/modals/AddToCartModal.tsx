"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import starsBg from "@/assets/stars.png";
import { Button } from "@/components/Button";

interface AddToCartModalProps {
  onClose: () => void;
  onContinueShopping: () => void;
  onGoToCart: () => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  onClose,
  onContinueShopping,
  onGoToCart,
}) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="bg-white bg-opacity-10 border border-white rounded-lg p-8 text-center"
        style={{
          boxShadow:
            "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)",
          backgroundImage: `url(${starsBg.src})`,
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Product added to cart
        </h2>
        <p className="text-lg text-white/70 mb-6">
          What would you like to do now?
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => {
              onContinueShopping();
              onClose();
            }}
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => {
              onGoToCart();
              onClose();
            }}
          >
            Go to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddToCartModal;
