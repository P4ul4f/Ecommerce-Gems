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
      className="bg-black bg-opacity-10 border border-white/15 rounded-lg p-8 text-center shadow-lg "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold text-white mb-4 p-2 tracking-tighter">Product added to cart</h2>
      <p className="text-lg text-white/70 mb-2 p-4 tracking-tight">What would you like to do now?</p>
      <div className="flex justify-center gap-4 mt-2">
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
    </motion.div>
  );
};

export default AddToCartModal;
