"use client";

import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { SignInButton } from "@clerk/nextjs";
import { mockProducts } from "@/components/shop/mockProducts";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalSavings,
    isLoading,
    isAuthenticated,
    addToCart,
  } = useCart();

  const handlePaymentSuccess = () => {
    onClose();
    // Router navigation will be handled by the RazorpayCheckoutButton
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    // You can add toast notification here
  };

  const handleUpdateQuantity = (id: string, size: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item) {
      updateQuantity(id, size, item.quantity + delta);
    }
  };

  const recommendedProducts = mockProducts
    .filter((p) => p.category === "accessories" || p.badge === "Bestseller")
    .slice(0, 2);

  const handleQuickAdd = async (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;

    const discountPercentage = product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

    await addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.image,
      size: "S",
      discount: discountPercentage,
      slug: product.slug,
    });
  };

  const progressMilestones = [
    { amount: 1299, discount: "10%" },
    { amount: 1999, discount: "15%" },
    { amount: 2999, discount: "20%" },
  ];

  const currentMilestoneIndex = progressMilestones.findIndex(
    (m) => subtotal < m.amount
  );
  const nextMilestone =
    currentMilestoneIndex !== -1
      ? progressMilestones[currentMilestoneIndex]
      : null;
  const amountToNext = nextMilestone
    ? nextMilestone.amount - subtotal
    : 0;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[450px] md:w-[520px]
        bg-[#f6f6f6] shadow-2xl z-50 transform transition-transform duration-300
        rounded-l-2xl flex flex-col overflow-hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ================= HEADER ================= */}
        <div className="bg-white border-b border-gray-200 rounded-tl-2xl shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-bold text-black">
              Your Cart ({cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="px-6 pb-4">
            <div className="bg-black text-white text-center py-2.5 rounded-full">
              <p className="text-sm font-semibold">
                Includes 5% OFF on Prepaid
              </p>
            </div>
          </div>

          {nextMilestone && (
            <div className="px-6 pb-5">
              <p className="text-sm text-gray-700 mb-3 text-center font-medium">
                Add more ₹{amountToNext.toFixed(2)} to avail{" "}
                {nextMilestone.discount} OFF
              </p>

              <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-full bg-black rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      (subtotal /
                        progressMilestones[
                          progressMilestones.length - 1
                        ].amount) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ================= CART CONTENT ================= */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin h-10 w-10 border-b-2 border-black rounded-full" />
            </div>
          )}

          {!isLoading && cartItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          )}

          {!isLoading && cartItems.length > 0 && (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-bold line-clamp-2">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          ₹{item.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-xs text-green-700 font-semibold">
                        {item.discount}% OFF
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-full">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.size, -1)
                          }
                          className="px-3 py-2"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.size, 1)
                          }
                          className="px-3 py-2"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.id, item.size)
                      }
                    >
                      <Trash2 className="text-red-500" size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Paired Products */}
              <div className="pt-4">
                <h3 className="text-sm font-bold mb-2">
                  PAIRED MOST FREQUENTLY
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {recommendedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="w-40 shrink-0 bg-white rounded-xl p-3"
                    >
                      <div className="relative h-24 mb-2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <p className="text-xs font-semibold line-clamp-2 mb-2">
                        {product.name}
                      </p>
                      <button
                        onClick={() => handleQuickAdd(product.id)}
                        className="w-full border border-black rounded-lg py-2 text-xs font-bold"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= FOOTER ================= */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t px-6 py-6 shrink-0">
            {totalSavings > 0 && (
              <div className="bg-green-500 text-white text-center py-2 rounded-full text-sm font-bold mb-4">
                ₹{totalSavings.toLocaleString()} Saved so far!
              </div>
            )}

            <div className="flex justify-between mb-4">
              <span className="font-bold text-lg">Estimated Total</span>
              <span className="text-2xl font-bold">
                ₹{subtotal.toLocaleString()}
              </span>
            </div>

            {!isAuthenticated ? (
              <SignInButton mode="modal">
                <button className="w-full bg-black text-white py-4 rounded-2xl font-bold">
                  Sign In to Checkout
                </button>
              </SignInButton>
            ) : (
              <RazorpayCheckoutButton
                className="rounded-2xl"
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            )}

            <p className="text-xs text-center text-gray-500 mt-3">
              Powered by <span className="font-semibold">Quiotech</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
