"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { useCart } from "@/context/CartContext"; 
import { useEffect } from "react";
import { BASE_URL } from "@/constants/BASE_URL";

export const Cart: React.FC = () => {
  const { cart, dispatch } = useCart(); // Extraer cart y dispatch del contexto


  // Calcular el precio total del carrito
  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Manejar el incremento de cantidad
  const handleAddQuantity = (productId: string) => {
    const product = cart.items.find((item) => item._id === productId);
    if (product) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity: product.quantity + 1 },
      });
    }
  };

  // Manejar la reducción de cantidad
  const handleReduceQuantity = (productId: string) => {
    const product = cart.items.find((item) => item._id === productId);
    if (product) {
      if (product.quantity > 1) {
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { id: productId, quantity: product.quantity - 1 },
        });
      } else {
        handleRemoveItem(productId); // Eliminar el ítem si la cantidad es 1
      }
    }
  };

  // Manejar la eliminación de un ítem
  const handleRemoveItem = (productId: string) => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from your cart?"
      )
    ) {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    }
  };

  console.log("Items in cart:", cart.items);

  const handleCheckout = async () => {
    const orderData = {
      orderItems: cart.items.map(item => ({
        product: item._id,
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress: {}, // Envía un objeto vacío, se llenará más tarde
    };

    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("Error al crear la orden");
      }

      const createdOrder = await res.json();
      localStorage.setItem("orderId", createdOrder._id);
      // Redirigir a la página de la orden
      window.location.href = "/order";
    } catch (error) {
      console.error("Error:", error);
      // Manejar errores
    }
  };

  useEffect(() => {
    console.log("Cart items in CartPage:", cart.items);
  }, [cart.items]);

  return (
    <section className="container mx-auto p-8 flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3 p-6 rounded-lg bg-[radial-gradient(90%_70%_at_center_center,rgb(140,69,255,0.5)_15%,rgb(14,0,36,-5)_78%,transparent)]
" >
        <h2 className="text-2xl font-bold text-white mb-4">Your Cart</h2>
        {cart.items.length > 0 ? (
          cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-16 p-4 border-b border-white/15"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-xl bg-black/25"
              />
              <div className="flex-grow">
                <h3 className="text-lg text-white">{item.name}</h3>
                <p className="text-white/50">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => handleReduceQuantity(item._id)}
                    className="px-2 bg-white/20 rounded text-white hover:bg-white/30"
                    aria-label={`Reduce quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="text-white">{item.quantity}</span>
                  <button
                    onClick={() => handleAddQuantity(item._id)}
                    className="px-2 bg-white/20 rounded text-white hover:bg-white/30"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="text-white hover:text-purple-700"
                aria-label={`Remove ${item.name} from cart`}
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p className="text-white/50">Your cart is empty</p>
        )}
      </div>

      <div className="md:w-1/3 h-full p-8 rounded-lg flex flex-col gap-4 items-center bg-[radial-gradient(90%_70%_at_center_center,rgb(140,69,255,0.5)_15%,rgb(14,0,36,-5)_78%,transparent)]">
        <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
        <p className="text-lg text-white/80">Total: ${totalPrice.toFixed(2)}</p>
        <Button onClick={handleCheckout}>Buy</Button>
      </div>
    </section>
  );
};
