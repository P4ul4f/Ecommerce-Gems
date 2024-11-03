"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"; // Importar useState y useEffect para manejar el estado
import { Header } from "@/sections/Header"; 
import { Footer } from "@/sections/Footer"; 
import ProductDetailsSection from "@/sections/ProductDetail";
import { Product } from "@/types/product"; // Asegúrate de que el tipo esté definido

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data); // Actualiza el estado con el producto
      } else {
        // Manejar el error, por ejemplo, redirigir o mostrar un mensaje
        console.error("Error fetching product:", response.status);
      }
      setLoading(false); // Finaliza la carga
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Mostrar un mensaje de carga
  }

  if (!product) {
    return <p>Product not found</p>; // Manejo de producto no encontrado
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ProductDetailsSection product={product} />
        <Footer />
      </div>
    </>
  );
};

export default ProductDetails;
