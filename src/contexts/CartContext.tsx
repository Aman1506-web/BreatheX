"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useCart as useCartHook } from "@/hooks/useCart";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  size: string;
  quantity: number;
  discount: number;
  slug: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (id: string, size: string) => Promise<void>;
  updateQuantity: (id: string, size: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalSavings: number;
  subtotal: number;
  itemCount: number;
  isLoading: boolean;
  isSyncing: boolean;
  justSynced: boolean;
  isAuthenticated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Use the unified cart hook that handles both guest and authenticated users
  const {
    items,
    addToCart: addToCartHook,
    updateQuantity: updateQuantityHook,
    removeFromCart: removeFromCartHook,
    clearCart: clearCartHook,
    totalSavings,
    subtotal,
    itemCount,
    isLoading,
    isSyncing,
    justSynced,
    isAuthenticated,
  } = useCartHook();

  // Convert items to CartItem format for backward compatibility
  const cartItems: CartItem[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    originalPrice: item.originalPrice,
    image: item.image,
    size: item.size,
    quantity: item.quantity,
    discount: item.discount,
    slug: item.slug,
  }));

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    await addToCartHook({
      id: item.id,
      productId: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      size: item.size,
      discount: item.discount,
    });
  };

  const removeFromCart = async (id: string, size: string) => {
    await removeFromCartHook(id, size);
  };

  const updateQuantity = async (id: string, size: string, quantity: number) => {
    await updateQuantityHook(id, size, quantity);
  };

  const clearCart = async () => {
    await clearCartHook();
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        totalSavings,
        subtotal,
        itemCount,
        isLoading,
        isSyncing,
        justSynced,
        isAuthenticated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
