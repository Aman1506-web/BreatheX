"use client";

import { useUser } from "@clerk/nextjs";
import { useCartStore } from "@/stores/cartStore";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";
import { triggerCartSyncConfetti } from "@/lib/confetti";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  size: string;
  quantity: number;
  discount: number;
}

export function useCart() {
  const { user, isLoaded } = useUser();
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);
  const [justSynced, setJustSynced] = useState(false);

  // Zustand store (for guest users)
  const guestCart = useCartStore();

  // Convex queries/mutations (for authenticated users)
  const userCartItems = useQuery(
    api.cart.getUserCart,
    user && isLoaded ? { userId: user.id } : "skip"
  );

  const addToCartMutation = useMutation(api.cart.addToCart);
  const updateQuantityMutation = useMutation(api.cart.updateCartItemQuantity);
  const removeFromCartMutation = useMutation(api.cart.removeFromCart);
  const clearCartMutation = useMutation(api.cart.clearUserCart);
  const mergeGuestCartMutation = useMutation(api.cart.mergeGuestCart);

  // Sync guest cart to user cart on login (only once)
  useEffect(() => {
    if (
      user &&
      isLoaded &&
      guestCart.items.length > 0 &&
      !isSyncing &&
      !hasSynced &&
      guestCart.isHydrated
    ) {
      setIsSyncing(true);

      const syncCart = async () => {
        try {
          await mergeGuestCartMutation({
            userId: user.id,
            guestCartItems: guestCart.items.map((item) => ({
              id: item.id,
              productId: item.id,
              name: item.name,
              slug: item.slug,
              price: item.price,
              originalPrice: item.originalPrice,
              image: item.image,
              size: item.size,
              quantity: item.quantity,
              discount: item.discount,
            })),
          });

          // Clear guest cart after successful merge
          guestCart.clearCart();
          setHasSynced(true);
          setJustSynced(true);

          // Trigger confetti animation
          setTimeout(() => {
            triggerCartSyncConfetti();
          }, 300);

          // Reset justSynced after animation
          setTimeout(() => {
            setJustSynced(false);
          }, 4000);
        } catch (error) {
          console.error("Failed to sync cart:", error);
        } finally {
          setIsSyncing(false);
        }
      };

      syncCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isLoaded, guestCart.isHydrated]);

  // Determine which cart to use
  const isAuthenticated = !!user && isLoaded;
  const items: CartItem[] = isAuthenticated
    ? (userCartItems || []).map((item) => ({
        id: item.productId,
        productId: item.productId,
        name: item.name,
        slug: item.slug,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        size: item.size,
        quantity: item.quantity,
        discount: item.discount,
      }))
    : guestCart.items;

  // Add to cart
  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    if (isAuthenticated) {
      try {
        await addToCartMutation({
          userId: user.id,
          productId: item.id,
          name: item.name,
          slug: item.slug,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image,
          size: item.size,
          discount: item.discount,
        });
      } catch (error) {
        console.error("Failed to add to cart:", error);
        throw error;
      }
    } else {
      guestCart.addItem(item);
    }
  };

  // Update quantity
  const updateQuantity = async (id: string, size: string, quantity: number) => {
    if (isAuthenticated) {
      try {
        await updateQuantityMutation({
          userId: user.id,
          productId: id,
          size,
          quantity,
        });
      } catch (error) {
        console.error("Failed to update quantity:", error);
        throw error;
      }
    } else {
      guestCart.updateQuantity(id, size, quantity);
    }
  };

  // Remove from cart
  const removeFromCart = async (id: string, size: string) => {
    if (isAuthenticated) {
      try {
        await removeFromCartMutation({
          userId: user.id,
          productId: id,
          size,
        });
      } catch (error) {
        console.error("Failed to remove from cart:", error);
        throw error;
      }
    } else {
      guestCart.removeItem(id, size);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await clearCartMutation({ userId: user.id });
      } catch (error) {
        console.error("Failed to clear cart:", error);
        throw error;
      }
    } else {
      guestCart.clearCart();
    }
  };

  // Computed values
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = total;
  const totalSavings = items.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
    subtotal,
    totalSavings,
    itemCount,
    isAuthenticated,
    isSyncing,
    justSynced,
    isLoading: isAuthenticated ? userCartItems === undefined : false,
  };
}
