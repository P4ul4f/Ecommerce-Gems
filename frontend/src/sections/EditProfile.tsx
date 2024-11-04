"use client";
import { useState } from "react";
import api from "@/services/axios";
import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import { motion } from "framer-motion";

interface ProfileData {
  name: string;
  email: string;
}

export const EditProfile = ({ profileData }: { profileData: ProfileData }) => {
  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [password, setPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.put(
        "/api/users/profile",
        { name, email, password },
        config
      );
      window.location.href = "/profile"; // Redirige de vuelta al perfil
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <motion.div
          className="border border-white/25 py-12 rounded-xl overflow-hidden relative"
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
              Edit Profile
            </h2>
            <form
              onSubmit={handleUpdateProfile}
              className="max-w-md mx-auto p-10"
            >
              <div className="flex flex-col mb-8">
                <label htmlFor="name" className="text-lg text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 text-black bg-white/80 border border-white rounded focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label htmlFor="email" className="text-lg text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 text-black bg-white/80 border border-white rounded focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-10">
                <label htmlFor="password" className="text-lg text-white mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 text-black bg-white/80 border border-white rounded focus:outline-none"
                  placeholder="Leave empty if no change"
                />
              </div>
              <div className="flex justify-center">
                <Button>Save Changes</Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EditProfile;
