"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Product } from "@/types/product";

// Definición de un ítem del carrito, extendiendo la interfaz Product
interface CartItem extends Product {
  _id: string;
  quantity: number;
}

// Estado del carrito que contiene una lista de ítems
interface CartState {
  items: CartItem[];
  itemCount: number;
}

// Tipos de acción que pueden despacharse al reducer
type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "INITIALIZE_CART"; payload: CartState };

// Crear el contexto para el carrito
const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Estado inicial del carrito
const initialCartState: CartState = { items: [], itemCount: 0 };

// Función para cargar el carrito desde el almacenamiento local
const loadCartFromLocalStorage = (): CartState => {
  const cartData = localStorage.getItem("cartItems");
  if (cartData) {
    const items: CartItem[] = JSON.parse(cartData);
    return {
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
    };
  }
  return initialCartState;
};

// Función para guardar el carrito en el almacenamiento local
const saveCartToLocalStorage = (cart: CartState) => {
  localStorage.setItem("cartItems", JSON.stringify(cart.items));
};

// Reducer que maneja las acciones del carrito
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      let updatedItems;

      if (existingItemIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        updatedItems = [...state.items, action.payload];
      }
      const newState = {
        ...state,
        items: updatedItems,
        itemCount: state.itemCount + action.payload.quantity,
      };
      saveCartToLocalStorage(newState); // Guardar en localStorage al agregar un ítem
      return newState;
    }
    case "REMOVE_FROM_CART": {
      const updatedItems = state.items.filter(
        (item) => item._id !== action.payload
      );
      const newState = {
        ...state,
        items: updatedItems,
        itemCount: Math.max(state.itemCount - 1, 0),
      };
      saveCartToLocalStorage(newState); // Guardar en localStorage al eliminar un ítem
      return newState;
    }
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item._id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newState = { ...state, items: updatedItems };
      saveCartToLocalStorage(newState); // Guardar en localStorage al actualizar la cantidad
      return newState;
    }
    case "INITIALIZE_CART": {
      return action.payload; // Inicializar el carrito con datos del localStorage
    }
    default:
      return state;
  }
};

// Proveedor del contexto del carrito
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // Efecto para cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    const cartData = loadCartFromLocalStorage();
    dispatch({ type: "INITIALIZE_CART", payload: cartData });
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
