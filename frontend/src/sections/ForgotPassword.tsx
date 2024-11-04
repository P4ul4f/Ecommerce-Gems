"use client";
import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import { useState } from "react";
import api from "@/services/axios";
import { motion } from "framer-motion";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/api/users/forgot-password", { email, newPassword });
      setMessage("Password updated successfully.");
    } catch (error) {
      setMessage("Error updating password. Please try again.");
    }
  };

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <motion.div
          className="border border-white/25 py-24 rounded-xl overflow-hidden relative"
          style={{ backgroundImage: `url(${starsBg.src})` }}
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
            className="absolute inset-0 bg-[rgb(74,32,137)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_30%,black,transparent)]"
            style={{ backgroundImage: `url(${gridLines.src})` }}
          ></div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium text-white">
              Forgot Password
            </h2>
            <form onSubmit={handleSubmit} className="mt-5 max-w-md mx-auto">
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="email"
                  className="text-lg text-white mb-2 tracking-tight"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="p-2 bg-white/80 border text-black border-white rounded focus:outline-none focus:border-purple-800"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="newPassword"
                  className="text-lg text-white mb-2 tracking-tight"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  required
                  className="p-2 bg-white/80 border text-black border-white rounded focus:outline-none focus:border-purple-800"
                />
              </div>
              {message && (
                <p className="text-center mb-4 text-white">{message}</p>
              )}
              <div className="flex justify-center pt-10">
                <Button>Submit</Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForgotPassword;

