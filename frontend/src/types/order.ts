// src/types/order.ts

export interface ShippingAddress {
    address: string;
    city: string;
    country: string;
  }
  
  export interface PaymentResult {
    id: string;
    status: string;
  }
  
  export interface Item {
    _id: string;
    name: string;
    qty: number; // Cambia a 'qty' para coincidir con la respuesta
    image: string;
    price: number;
    product: string; // ID del producto
  }
  
  export interface Order {
    _id: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
    orderItems: Item[];
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string; // O Date
    updatedAt: string; // O Date
    shippingAddress: ShippingAddress; // Asegúrate de que este campo esté incluido
    paymentResult?: PaymentResult; // Campo opcional para el resultado del pago
    paidAt?: string; // Campo opcional
    isCompleted?: boolean; // Campo opcional
  }
  