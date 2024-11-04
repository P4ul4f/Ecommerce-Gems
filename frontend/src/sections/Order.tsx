"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BASE_URL } from "@/constants/BASE_URL";
import { Spinner } from "@nextui-org/react";

export const Order: React.FC = () => {
  const { cart } = useCart();
  const [clientId, setClientId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Estado para la dirección de envío
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postcode: "",
    country: "",
  });

  const [isAddressSaved, setIsAddressSaved] = useState(false);

  // Calcular el precio total del carrito
  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const subtotal = totalPrice;
  const tax = subtotal * 0.1; // Cálculo de impuestos
  const shippingPrice = 5; // Precio de envío fijo
  const total = subtotal + tax + shippingPrice;

  useEffect(() => {
    const getPaypalClientID = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/config/paypal`);
        setClientId(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching PayPal client ID:", err);
        setLoading(false);
      }
    };

    getPaypalClientID();
  }, []);

  // se guarda en localStorage cada vez que cambia shippingAddress
  useEffect(() => {
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  useEffect(() => {
    // Cargar la dirección de envío guardada en local storage al montar el componente
    const savedShippingAddress = localStorage.getItem("shippingAddress");
    if (savedShippingAddress) {
      setShippingAddress(JSON.parse(savedShippingAddress));
      setIsAddressSaved(true);
    }
  }, []);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedAddress = { ...shippingAddress, [name]: value };
    setShippingAddress(updatedAddress);
    localStorage.setItem("shippingAddress", JSON.stringify(updatedAddress));
  };

  // Función para guardar la dirección de envío en local storage
  const saveShippingAddress = () => {
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    setIsAddressSaved(true);
  };

  const saveOrder = async (paymentResult: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authentication required. Please login.");

      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Suponiendo que ya tienes el ID de la orden almacenado
      const orderId = localStorage.getItem("orderId");
      if (!orderId) throw new Error("Order ID not found.");

      // Crear el objeto con solo la dirección de envío y el resultado del pago
      const orderData = {
        shippingAddress, // Asegúrate de que estás usando el estado actualizado
        paymentResult,
      };

      console.log("Order Data being sent:", orderData);

      // Realizar la solicitud PUT para actualizar la orden
      const response = await axios.put(
        `${BASE_URL}/api/orders/${orderId}/payment`,
        orderData,
        config
      );

      const createdOrderId = response.data._id;

      console.log("Order created:", createdOrderId);

      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      window.location.href = `/user-order/${createdOrderId}`;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      console.error(err);
    }
  };

  if (loading) return <Spinner color="default" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="container mx-auto p-8 flex flex-col md:flex-row gap-8">
      {/* Sección de productos */}
      <div className="md:w-2/3 p-6 rounded-lg bg-[radial-gradient(90%_70%_at_center_center,rgb(140,69,255,0.5)_15%,rgb(14,0,36,-5)_78%,transparent)]">
        <h2 className="text-2xl font-bold text-white mb-4">Your Order</h2>
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
              </div>
            </div>
          ))
        ) : (
          <p className="text-white/50">Your order is empty</p>
        )}
        <div className="flex flex-col mt-4 p-8 gap-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Sección del formulario de dirección de envío */}
      <div className="md:w-1/3 max-h-full  p-4 bg-[radial-gradient(90%_70%_at_center_center,rgb(140,69,255,0.5)_15%,rgb(14,0,36,-5)_78%,transparent)]">
        <h2 className="text-2xl font-bold text-white mb-4 ">
          Shipping Address
        </h2>
        <form className=" p-4 rounded-lg gap-4 ">
          {["address", "city", "postcode", "country"].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block mb-1 text-white capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={(shippingAddress as any)[field]}
                onChange={handleShippingChange}
                className="w-full border border-white/30 bg-white/90 rounded text-black p-2"
                required
              />
            </div>
          ))}
          {/* Botón para guardar la dirección de envío */}
          <div className="pt-6">
            <button
              type="button"
              onClick={saveShippingAddress}
              disabled={isAddressSaved}
              className={`w-full text-white font-bold py-2 rounded ${
                isAddressSaved
                  ? "bg-white/15 cursor-default"
                  : "bg-white/15 hover:bg-white/30 cursor-pointer"
              }`}
            >
              {isAddressSaved ? "Address Saved" : "Save Shipping Address"}
            </button>
          </div>

          <div className="pt-6">
            {clientId && (
              <PayPalScriptProvider
                options={{
                  clientId: clientId,
                  currency: "USD",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: total.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      const details = await actions.order?.capture();
                      if (details) {
                        saveOrder(details); // Guarda los detalles de la orden
                      } else {
                        setError("Error: No order details found.");
                      }
                    } catch (error) {
                      console.error("Error capturing the order:", error);
                      setError("Error capturing the order.");
                    }
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </section>
  );
};
