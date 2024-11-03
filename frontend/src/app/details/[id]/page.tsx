"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"; // Importar useState y useEffect para manejar el estado
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import ProductDetailsSection from "@/sections/ProductDetail";
import { Product } from "@/types/product"; // Asegúrate de que el tipo esté definido
import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        // La respuesta de axios se encuentra en res.data
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <Spinner color="default" />;

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
