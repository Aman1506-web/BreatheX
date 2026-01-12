"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import { CheckCircle, Package, Truck, Clock, XCircle, ArrowLeft, Download } from "lucide-react";
import { triggerCheckoutConfetti } from "@/lib/confetti";

interface OrderItem {
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

interface Order {
  _id: string;
  _creationTime: number;
  orderNumber: string;
  userId: string;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  totalSavings: number;
  totalAmount: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: "created" | "pending" | "paid" | "failed" | "cancelled" | "refunded";
  paymentStatus: "pending" | "authorized" | "captured" | "failed";
  shippingAddress?: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  currency: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
  paidAt?: number;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [showConfetti, setShowConfetti] = useState(false);

  const orderNumber = params.orderNumber as string;
  const isSuccess = searchParams.get("success") === "true";

  // Query order from Convex
  const order = useQuery(
    api.orders.getOrderByNumber,
    user && orderNumber
      ? { orderNumber, userId: user.id }
      : "skip"
  ) as Order | null | undefined;

  // Trigger confetti on successful payment
  useEffect(() => {
    if (isSuccess && !showConfetti && order?.status === "paid") {
      triggerCheckoutConfetti();
      setShowConfetti(true);
    }
  }, [isSuccess, showConfetti, order]);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-black rounded-full" />
      </div>
    );
  }

  if (order === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-black rounded-full" />
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find an order with number {orderNumber}
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = {
    paid: {
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      title: "Payment Successful!",
      description: "Your order has been confirmed and is being processed.",
    },
    pending: {
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      title: "Payment Pending",
      description: "Your payment is being processed.",
    },
    failed: {
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      title: "Payment Failed",
      description: "Unfortunately, your payment could not be processed.",
    },
    cancelled: {
      icon: XCircle,
      color: "text-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      title: "Order Cancelled",
      description: "This order has been cancelled.",
    },
  };

  const currentStatus = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/shop")}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Shop</span>
        </button>

        {/* Order Status Card */}
        <div
          className={`${currentStatus.bgColor} ${currentStatus.borderColor} border-2 rounded-2xl p-8 mb-6 text-center`}
        >
          <StatusIcon className={`${currentStatus.color} w-16 h-16 mx-auto mb-4`} />
          <h1 className="text-3xl font-bold mb-2">{currentStatus.title}</h1>
          <p className="text-gray-600 mb-4">{currentStatus.description}</p>
          <div className="inline-block bg-white px-6 py-3 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-xl font-bold">{order.orderNumber}</p>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Date</span>
                <span className="font-semibold">{formatDate(order.createdAt)}</span>
              </div>
              {order.paidAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Date</span>
                  <span className="font-semibold">{formatDate(order.paidAt)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Status</span>
                <span
                  className={`font-semibold ${
                    order.paymentStatus === "captured"
                      ? "text-green-600"
                      : order.paymentStatus === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.paymentStatus.charAt(0).toUpperCase() +
                    order.paymentStatus.slice(1)}
                </span>
              </div>
              {order.razorpayPaymentId && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment ID</span>
                  <span className="font-mono text-xs">
                    {order.razorpayPaymentId.slice(0, 20)}...
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Customer Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{order.userName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{order.userEmail}</p>
              </div>
              {order.userPhone && (
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold">{order.userPhone}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={`${item.productId}-${item.size}-${index}`}
                className="flex gap-4 pb-4 border-b last:border-b-0"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Size: {item.size} • Qty: {item.quantity}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    {item.originalPrice > item.price && (
                      <>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-xs text-green-600 font-semibold">
                          {item.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Payment Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="font-semibold text-green-600">
                  -₹{order.discount.toLocaleString()}
                </span>
              </div>
            )}
            {order.totalSavings > 0 && (
              <div className="flex justify-between text-sm bg-green-50 -mx-6 px-6 py-2">
                <span className="text-green-700 font-semibold">Total Savings</span>
                <span className="font-bold text-green-700">
                  ₹{order.totalSavings.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-3 border-t">
              <span>Total Paid</span>
              <span>₹{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/shop")}
            className="flex-1 bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-white border-2 border-black text-black py-4 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Invoice
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Need help with your order?</p>
          <p className="mt-1">
            Contact us at{" "}
            <a href="mailto:support@breathex.com" className="text-black font-semibold underline">
              support@breathex.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
