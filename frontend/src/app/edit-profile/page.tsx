"use client";
import React, { useEffect, useState } from 'react';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { EditProfile } from '@/sections/EditProfile';
import api from "@/services/axios"; // Asegúrate de importar tu instancia de axios

interface ProfileData {
  name: string;
  email: string;
}

const EditProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    // Obtener los datos del perfil (por ejemplo, desde la API)
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await api.get("/api/users/profile", config);
        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile data", err);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <EditProfile profileData={profileData} />
      <Footer />
    </>
  );
};

export default EditProfilePage;

