"use client"; // Indica que este es un componente de cliente

import dynamic from "next/dynamic";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

const Profile = dynamic(() => import("@/sections/Profile"), { ssr: false });

const ProfilePage = () => {
  return (
    <>
      <Header />
      <div className="max-h-screen">
        <Profile />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
