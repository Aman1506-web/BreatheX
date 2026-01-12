/**
 * Razorpay TypeScript Definitions
 * https://razorpay.com/docs/payment-gateway/web-integration/standard/
 */

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
  modal?: {
    backdropclose?: boolean;
    escape?: boolean;
    handleback?: boolean;
    confirm_close?: boolean;
    ondismiss?: () => void;
    animation?: boolean;
  };
  retry?: {
    enabled?: boolean;
    max_count?: number;
  };
  timeout?: number;
  readonly?: {
    contact?: boolean;
    email?: boolean;
    name?: boolean;
  };
  hidden?: {
    contact?: boolean;
    email?: boolean;
  };
  send_sms_hash?: boolean;
  allow_rotation?: boolean;
  remember_customer?: boolean;
  config?: {
    display?: {
      language?: string;
      blocks?: {
        banks?: {
          name?: string;
          instruments?: Array<{
            method: string;
            banks?: string[];
          }>;
        };
      };
    };
  };
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

export interface RazorpayInstance {
  open(): void;
  close(): void;
  on(event: string, callback: (response: RazorpayErrorResponse) => void): void;
}

export interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

export interface CreateOrderRequest {
  amount: number;
  currency?: string;
  items: Array<{
    productId: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: number;
    image: string;
    size: string;
    quantity: number;
    discount: number;
  }>;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  subtotal: number;
  discount: number;
  totalSavings: number;
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
  notes?: {
    customerNote?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  amount: number;
  currency: string;
  orderNumber: string;
  convexOrderId: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  orderNumber: string;
}

export interface PaymentFailureRequest {
  razorpay_order_id: string;
  error?: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
  };
}
