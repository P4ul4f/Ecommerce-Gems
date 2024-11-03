"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import starsBg from "@/assets/stars.png";
import { Order } from "@/types/order";
import Image from "next/image";
import { motion } from "framer-motion";
import { BASE_URL } from "@/constants/BASE_URL";
import { Spinner } from "@nextui-org/react";

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${BASE_URL}/api/orders/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrder(data);
          setLoading(false);
        } else {
          setError(`Error fetching order: ${response.status}`);
          console.error("Error fetching order:", response.status);
        }
      } catch (err) {
        console.error("An error occurred:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Spinner color="default" />;

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <>
      <Header />
      <motion.div
        className="min-h-screen"
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
        <section className="container flex justify-center p-10">
          {/* Contenedor para Detalles de la Orden */}
          <div className="md:w-2/3 p-10 flex flex-col gap-8 rounded-lg bg-[radial-gradient(90%_70%_at_center_center,rgb(140,69,255,0.5)_15%,rgb(14,0,36,-5)_78%,transparent)]">
            <h2 className="text-4xl tracking-tighter font-bold text-white mb-4">
              Order ID: {order._id}
            </h2>

            <h4
              className="text-xl font-semibold text-white mb-2"
              style={{
                color: "#ffffff",
                textShadow: "0 0 6px #ffffff",
              }}
            >
              Items:
            </h4>
            {order.orderItems?.length > 0 ? (
              order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b border-white/15 py-2"
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
                    <p className="text-white/50">
                      ${item.price.toFixed(2)} x {item.qty}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/50">No items found in this order.</p>
            )}
            <div className="flex gap-4 items-center">
              <h4
                className="text-xl font-semibold text-white"
                style={{
                  color: "#ffffff",
                  textShadow: "0 0 6px #ffffff",
                }}
              >
                Payment Method:
              </h4>
              <p>{order.paymentMethod}</p>
            </div>

            <div className="flex gap-4 items-center">
              <p
                className="text-xl font-semibold text-white"
                style={{
                  color: "#ffffff",
                  textShadow: "0 0 6px #ffffff",
                }}
              >
                Shipping Address:
              </p>
              <p className="text-white">
                {order.shippingAddress.address
                  ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`
                  : "Shipping address not provided."}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <p
                className="text-xl font-semibold text-white"
                style={{
                  color: "#ffffff",
                  textShadow: "0 0 6px #ffffff",
                }}
              >
                Delivery:
              </p>
              <p className="text-white">
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <p
                className="text-xl font-semibold text-white"
                style={{
                  color: "#ffffff",
                  textShadow: "0 0 6px #ffffff",
                }}
              >
                Pay:
              </p>
              <p className="text-white">{order.isPaid ? "Paid" : "Not Paid"}</p>
            </div>
            <div className="flex gap-4 items-center">
              <p
                className="text-xl font-semibold text-white"
                style={{
                  color: "#ffffff",
                  textShadow: "0 0 6px #ffffff",
                }}
              >
                Created At:
              </p>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-4 items-center border-t border-white/15 pt-6">
              <p
                className="text-2xl tracking-tight font-bold text-white"
                style={{
                  color: "#ffffff",
                  textShadow: "0 0 6px #ffffff",
                }}
              >
                Total Price:
              </p>
              <p className="text-2xl">${order.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </section>
      </motion.div>
      <Footer />
    </>
  );
};

export default OrderDetails;
