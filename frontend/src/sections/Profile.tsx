"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import api from "@/services/axios";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    _id: "",
    name: "",
    email: "",
    isAdmin: false,
    createdAt: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No auth token found. Please login.");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await api.get("/api/users/profile", config);
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching profile data.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Spinner color="default" />;
  if (error) return <p>Error: {error}</p>;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cartItems");
    window.location.href = "/";
  };

  return (
    <section className="py-20 md:py-24">
      <div className="container lg:p-12">
        <motion.div
          className="border border-white/15 rounded-xl overflow-hidden relative pt-24 pb-16 px-10"
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
            <h2
              className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium text-white"
              style={{ color: "#ffffff", textShadow: "0 0 8px #ffffff" }}
            >
              {profileData.name}
            </h2>
            {error ? (
              <p className="text-red-500 text-center mt-4">{error}</p>
            ) : (
              <div className="flex flex-col gap-4 mt-5 mx-auto text-white p-2 md:text-lg sm:text-sm">
                <div className="flex flex-col gap-4 max-w-md mx-auto text-center">
                  <div className="flex flex-grid justify-center gap-2">
                    <strong
                      style={{
                        color: "#ffffff",
                        textShadow: "0 0 8px #ffffff",
                      }}
                    >
                      Email:{" "}
                    </strong>
                    <p>{profileData.email}</p>
                  </div>
                  <div className="flex flex-grid justify-center gap-2">
                    <strong
                      style={{
                        color: "#ffffff",
                        textShadow: "0 0 8px #ffffff",
                      }}
                    >
                      Created At:{" "}
                    </strong>
                    <p>{new Date(profileData.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Button href="/edit-profile">Update Profile</Button>
                </div>
                <div className="flex justify-between items-center pt-10 pl-12 pr-12">
                  <button
                    onClick={handleLogout}
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
                    Logout
                  </button>
                  <button
                    onClick={() => (window.location.href = "/user-order")}
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
                    View Orders
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
