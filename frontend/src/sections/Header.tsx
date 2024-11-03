"use client";
import LogoIcon from "@/assets/logo.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import { Button } from "@/components/Button";
import cartImg from "@/assets/cart.png";
import user from "@/assets/user.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export const Header = () => {
  const { cart } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Se verifica si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Alterna el estado del menú
  };

  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto backdrop-blur">
          <div>
            <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
              <a href="/">
                <LogoIcon className="h-8 w-8" />
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              <Link href="/" className="text-white/70 hover:text-white transition">
                Home
              </Link>
              <Link href="/products" className="text-white/70 hover:text-white transition">
                Collections
              </Link>
            </nav>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <MenuIcon />
            </button>
          </div>
          {/* Iconos de carrito y usuario visibles en todas las pantallas */}
          <div className="hidden md:flex gap-4 items-center">
            <Button href="/cart">
              <div className="relative">
                <Image
                  src={cartImg}
                  alt="Cart"
                  className="h-5 w-5 relative"
                  width={20}
                  height={20}
                />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-3 -right-4 text-white bg-white/15 rounded-full border border-purple-700/25 text-xs w-5 h-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </div>
            </Button>
            <Button href={isAuthenticated ? "/profile" : "/register"}>
              <Image
                src={user}
                alt="User"
                className="h-5 w-5 relative"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && ( // Renderiza el menú basado en el estado
        <div className="md:hidden bg-black p-4 rounded-lg shadow-md mt-2 ">
          <nav className="flex flex-col gap-6 text-sm justify-center items-center">
            <Link
              href="/"
              className="text-white hover:text-white/60 transition "
              onClick={() => setIsMenuOpen(false)} // Cierra el menú al seleccionar
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-white hover:text-white/60 transition"
              onClick={() => setIsMenuOpen(false)} // Cierra el menú al seleccionar
            >
              Collections
            </Link>
            {/* Iconos de carrito y usuario visibles al abrir el menú */}
            <div className="flex gap-4 items-center mt-2">
              <Button href="/cart">
                <div className="relative">
                  <Image
                    src={cartImg}
                    alt="Cart"
                    className="h-5 w-5 relative"
                    width={20}
                    height={20}
                  />
                  {cart.itemCount > 0 && (
                    <span className="absolute -top-3 -right-4 text-white bg-white/15 rounded-full border border-purple-700/25 text-xs w-5 h-5 flex items-center justify-center">
                      {cart.itemCount}
                    </span>
                  )}
                </div>
              </Button>
              <Button href={isAuthenticated ? "/profile" : "/register"}>
                <Image
                  src={user}
                  alt="User"
                  className="h-5 w-5 relative"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
