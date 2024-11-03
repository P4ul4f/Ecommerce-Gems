"use client";
import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import { useState } from "react";
import api from "@/services/axios";
import { motion } from "framer-motion";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // Nuevo estado para el checkbox

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/users/register", {
        name,
        email,
        password,
      });
      // Aquí puedes guardar el token en localStorage o manejar la respuesta de otra forma
      // localStorage.setItem("authToken", response.data.token);
      window.location.href = "/";
      // Redirigir al usuario o hacer alguna acción después del registro exitoso
    } catch (error) {
      console.error("Error de registro", error);
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
              Register
            </h2>
            <form onSubmit={handleSubmit} className="mt-5 max-w-md mx-auto">
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="name"
                  className="text-lg text-white mb-2 tracking-tight"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="p-2 bg-white/80 border text-black border-white rounded focus:outline-none focus:border-purple-800"
                />
              </div>
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
                  className="p-2 text-black bg-white/80 border border-white rounded focus:outline-none focus:border-purple-800"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="password"
                  className="text-lg text-white mb-2 tracking-tight"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="p-2 bg-white/80 border text-black border-white rounded focus:outline-none focus:border-purple-800"
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)} // Alternar estado al cambiar
                  className="mr-3 rounded"
                  required
                />
                <label htmlFor="terms" className="text-white">
                  I accept the terms and conditions
                </label>
              </div>
              <div className="flex justify-center pt-10">
                <Button>
                  {/* <Image
                    src={eye}
                    alt="Iniciar sesión"
                    className="h-8 w-8 relative"
                    width={25}
                    height={25}
                  /> */}
                  Submit
                </Button>
              </div>
              <div className="flex justify-center pt-8 gap-4">
                <h4>Do you already have an account?</h4>
                <a
                  href="/login"
                  className="text-purple-700 hover:text-white"
                  style={{
                    transition: "color 0.3s ease", // para suavizar la transición de color
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow =
                      "0 0 10px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  Login
                </a>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Register;
