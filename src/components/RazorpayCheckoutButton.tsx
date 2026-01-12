"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import {
  RazorpayOptions,
  CreateOrderRequest,
  CreateOrderResponse,
  VerifyPaymentResponse,
  RazorpaySuccessResponse,
  RazorpayErrorResponse,
} from "@/types/razorpay";
import { triggerCheckoutConfetti } from "@/lib/confetti";

interface RazorpayCheckoutButtonProps {
  className?: string;
  disabled?: boolean;
  onSuccess?: (orderNumber: string) => void;
  onError?: (error: string) => void;
}

export default function RazorpayCheckoutButton({
  className = "",
  disabled = false,
  onSuccess,
  onError,
}: RazorpayCheckoutButtonProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { cartItems, subtotal, totalSavings, clearCart } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if Razorpay SDK is loaded
  const isRazorpayLoaded = () => {
    return typeof window !== "undefined" && window.Razorpay !== undefined;
  };

  const handlePayment = async () => {
    try {
      // Reset error
      setError(null);

      // Check if user is loaded
      if (!isLoaded) {
        setError("Please wait while we load your information...");
        return;
      }

      // Check authentication
      if (!user) {
        setError("Please login to continue");
        router.push("/sign-in");
        return;
      }

      // Check cart
      if (cartItems.length === 0) {
        setError("Your cart is empty");
        return;
      }

      // Check if Razorpay SDK is loaded
      if (!isRazorpayLoaded()) {
        setError("Payment system not loaded. Please refresh the page.");
        return;
      }

      setIsProcessing(true);

      // Get cart totals
      const totalAmount = subtotal;
      const discount = 0; // You can add discount logic here

      // Prepare order data
      const orderData: CreateOrderRequest = {
        amount: totalAmount,
        currency: "INR",
        items: cartItems.map((item) => ({
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
        userEmail: user.emailAddresses[0]?.emailAddress || "",
        userName: user.fullName || user.firstName || "",
        userPhone: user.phoneNumbers[0]?.phoneNumber || undefined,
        subtotal,
        discount,
        totalSavings,
      };

      // Create Razorpay order
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const orderResponse: CreateOrderResponse = await response.json();

      // Configure Razorpay options
      const razorpayOptions: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: "BreatheX",
        description: `Order for ${cartItems.length} item${cartItems.length > 1 ? "s" : ""}`,
        image: "/logo.png", // Add your logo path
        order_id: orderResponse.orderId,
        handler: async (response: RazorpaySuccessResponse) => {
          await handlePaymentSuccess(response);
        },
        prefill: {
          name: user.fullName || user.firstName || "",
          email: user.emailAddresses[0]?.emailAddress || "",
          contact: user.phoneNumbers[0]?.phoneNumber || "",
        },
        theme: {
          color: "#000000",
          backdrop_color: "rgba(0, 0, 0, 0.5)",
        },
        modal: {
          backdropclose: false,
          escape: false,
          confirm_close: true,
          ondismiss: () => {
            setIsProcessing(false);
            setError("Payment cancelled");
          },
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
      };

      // Initialize Razorpay
      const razorpayInstance = new window.Razorpay(razorpayOptions);

      // Handle payment failure
      razorpayInstance.on(
        "payment.failed",
        async (response: RazorpayErrorResponse) => {
          await handlePaymentFailure(
            orderResponse.orderId,
            response.error.description
          );
        }
      );

      // Open Razorpay checkout
      razorpayInstance.open();
    } catch (err: unknown) {
      console.error("Payment error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to process payment";
      setError(errorMessage);
      onError?.(errorMessage);
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (
    response: RazorpaySuccessResponse
  ) => {
    try {
      // Verify payment on server
      const verifyResponse = await fetch("/api/razorpay/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Payment verification failed");
      }

      const verifyData: VerifyPaymentResponse = await verifyResponse.json();

      // Clear cart
      clearCart();

      // Show success confetti
      triggerCheckoutConfetti();

      // Call success callback
      onSuccess?.(verifyData.orderNumber);

      // Redirect to success page
      router.push(`/orders/${verifyData.orderNumber}?success=true`);
    } catch (err: unknown) {
      console.error("Payment verification error:", err);
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError("Payment verification failed. Please contact support.");
      onError?.(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentFailure = async (orderId: string, errorDescription: string) => {
    try {
      // Mark order as failed
      await fetch("/api/razorpay/verify", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          error: {
            description: errorDescription,
          },
        }),
      });

      setError(errorDescription || "Payment failed");
      onError?.(errorDescription);
    } catch (err) {
      console.error("Failed to mark order as failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const isButtonDisabled =
    disabled || isProcessing || cartItems.length === 0 || !isLoaded || !user;

  return (
    <div className="w-full">
      <button
        onClick={handlePayment}
        disabled={isButtonDisabled}
        className={`w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-base
          hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed
          transition-all duration-200 ease-in-out
          flex items-center justify-center gap-2
          ${className}`}
      >
        {isProcessing ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Pay Now</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-start gap-2">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </p>
        </div>
      )}

      {!user && isLoaded && (
        <p className="mt-3 text-sm text-gray-600 text-center">
          Please{" "}
          <button
            onClick={() => router.push("/sign-in")}
            className="text-black font-semibold underline hover:no-underline"
          >
            login
          </button>{" "}
          to continue
        </p>
      )}
    </div>
  );
}
