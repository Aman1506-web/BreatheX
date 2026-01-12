# 🚀 Razorpay Payment Integration - Complete Setup Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Files Structure](#files-structure)
3. [Environment Variables](#environment-variables)
4. [Testing the Integration](#testing-the-integration)
5. [Webhook Setup](#webhook-setup)
6. [Email Notifications](#email-notifications)
7. [Production Checklist](#production-checklist)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This is a **production-ready Razorpay payment integration** with:
- ✅ Secure server-side payment processing
- ✅ HMAC SHA256 signature verification
- ✅ Webhook support for real-time updates
- ✅ Order confirmation page
- ✅ Email notifications (optional)
- ✅ Full TypeScript type safety
- ✅ Convex database integration
- ✅ Cart synchronization

---

## 📁 Files Structure

### **Core Payment Files**
```
src/
├── app/
│   ├── api/
│   │   └── razorpay/
│   │       ├── order/route.ts          # Create Razorpay order
│   │       ├── verify/route.ts         # Verify payment signature
│   │       └── webhook/route.ts        # Handle Razorpay webhooks
│   └── orders/
│       └── [orderNumber]/page.tsx      # Order confirmation page
├── components/
│   └── RazorpayCheckoutButton.tsx      # Payment button component
├── lib/
│   └── email.ts                        # Email service (optional)
└── types/
    └── razorpay.ts                     # TypeScript definitions

convex/
├── schema/
│   └── orders.ts                       # Order schema
└── orders.ts                           # Order CRUD functions
```

---

## 🔐 Environment Variables

### **Required Variables** (Already Set)
```env
# Razorpay API Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_oE3msXibZ7qG0C
RAZORPAY_KEY_SECRET=loyhm3H8rxSxYJCTf0tf4SBc
```

### **Optional Variables**

#### **For Webhooks**
```env
# Get this from Razorpay Dashboard > Settings > Webhooks
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

#### **For Email Notifications**
```env
# Resend API Key (sign up at resend.com)
RESEND_API_KEY=re_your_resend_api_key

# Your app URL for email links
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🧪 Testing the Integration

### **1. Test Payment Flow**

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to shop page and add items to cart

3. Click on cart icon and click "Pay Now"

4. Use **Razorpay Test Cards**:

   **✅ Success Card**
   - Card Number: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date

   **❌ Failure Card**
   - Card Number: `4000 0000 0000 0002`
   - CVV: Any 3 digits
   - Expiry: Any future date

5. Complete the payment

6. You'll be redirected to `/orders/[orderNumber]?success=true`

### **2. Test Order Page**

Visit: `http://localhost:3000/orders/ORD-XXXXXXXXX-XXXXXX`

Replace with actual order number from your test payment.

---

## 🔗 Webhook Setup

Webhooks allow Razorpay to notify your app about payment status changes in real-time.

### **Step 1: Create Webhook Secret**

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to: **Settings** → **Webhooks**
3. Click **"Create New Webhook"**

### **Step 2: Configure Webhook**

**Webhook URL:**
```
https://yourdomain.com/api/razorpay/webhook
```

For local testing with ngrok:
```
https://your-ngrok-url.ngrok.io/api/razorpay/webhook
```

**Active Events:** (Select these)
- ✅ `payment.authorized`
- ✅ `payment.captured`
- ✅ `payment.failed`
- ✅ `order.paid`

### **Step 3: Add Webhook Secret**

Copy the **Webhook Secret** and add to `.env.local`:
```env
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### **Step 4: Test Webhook**

Test using Razorpay Dashboard:
1. Go to webhook settings
2. Click **"Send Test Webhook"**
3. Select event type: `payment.captured`
4. Check your app logs

---

## 📧 Email Notifications

### **Setup (Optional)**

1. **Install Resend**
   ```bash
   npm install resend
   ```

2. **Sign up at [Resend.com](https://resend.com)**
   - Get your API key
   - Verify your domain

3. **Add API Key to .env.local**
   ```env
   RESEND_API_KEY=re_your_api_key
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

4. **Update Email Sender**

   Edit `src/lib/email.ts` line 48:
   ```typescript
   from: "BreatheX <orders@yourdomain.com>", // Use your verified domain
   ```

5. **Enable Email in Webhook**

   Uncomment in `src/app/api/razorpay/webhook/route.ts`:
   ```typescript
   // Line 207
   import { sendOrderConfirmationEmail } from "@/lib/email";

   // Line 228
   await sendOrderConfirmationEmail(order);
   ```

### **Email Templates**

Two email templates are included:
1. **Order Confirmation** - Sent when payment is successful
2. **Payment Failure** - Sent when payment fails

---

## ✅ Production Checklist

### **Before Going Live:**

- [ ] **Replace Test Keys with Live Keys**
  ```env
  NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
  RAZORPAY_KEY_SECRET=your_live_secret
  ```

- [ ] **Activate Your Razorpay Account**
  - Submit KYC documents
  - Get account approved by Razorpay

- [ ] **Set Up Webhooks**
  - Configure production webhook URL
  - Add webhook secret to production env

- [ ] **Configure Email Service**
  - Set up Resend (or alternative)
  - Verify your domain
  - Test email delivery

- [ ] **Test in Production**
  - Test with live test cards
  - Verify webhook delivery
  - Check email notifications

- [ ] **Security Audit**
  - Ensure all API keys are in environment variables
  - Verify signature verification is working
  - Check error handling

- [ ] **Monitoring**
  - Set up error tracking (Sentry, etc.)
  - Monitor webhook failures
  - Track payment success rates

---

## 🛠 Troubleshooting

### **Payment Modal Not Opening**

**Problem:** Razorpay modal doesn't open

**Solution:**
1. Check if Razorpay SDK is loaded:
   ```javascript
   console.log(window.Razorpay); // Should not be undefined
   ```
2. Verify `<script>` tag in `layout.tsx`
3. Check browser console for errors

### **Signature Verification Failed**

**Problem:** Payment succeeds but verification fails

**Solution:**
1. Ensure `RAZORPAY_KEY_SECRET` matches test/live mode
2. Check if order was created with correct key
3. Verify no extra characters in env variables

### **Webhook Not Receiving Events**

**Problem:** Webhook endpoint not being called

**Solution:**
1. Check webhook URL is publicly accessible
2. Verify webhook secret matches
3. Check Razorpay webhook logs in dashboard
4. For local testing, use ngrok:
   ```bash
   ngrok http 3000
   ```

### **Order Not Found After Payment**

**Problem:** Redirects to order page but shows "Order Not Found"

**Solution:**
1. Check Convex database for order
2. Verify `userId` matches in order query
3. Check browser network tab for API errors

### **Email Not Sending**

**Problem:** Order confirmation email not delivered

**Solution:**
1. Check if `RESEND_API_KEY` is set
2. Verify domain in Resend dashboard
3. Check email service logs
4. Verify `sendOrderConfirmationEmail` is called

---

## 📊 Payment Flow Diagram

```
User Clicks "Pay Now"
    ↓
[RazorpayCheckoutButton]
    ↓
POST /api/razorpay/order
    ↓
Create Order in Razorpay
    ↓
Store Order in Convex
    ↓
Open Razorpay Modal
    ↓
User Completes Payment
    ↓
POST /api/razorpay/verify
    ↓
Verify Signature (HMAC SHA256)
    ↓
Update Order Status
    ↓
Clear Cart
    ↓
Trigger Confetti 🎉
    ↓
Redirect to Order Page
    ↓
[Optional] Send Email
```

---

## 🔗 Useful Links

- [Razorpay Dashboard](https://dashboard.razorpay.com/)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)
- [Razorpay Webhooks](https://razorpay.com/docs/webhooks/)
- [Resend Documentation](https://resend.com/docs)
- [Convex Documentation](https://docs.convex.dev/)

---

## 📞 Support

If you encounter issues:
1. Check this documentation
2. Review error logs in browser console
3. Check Razorpay dashboard for payment status
4. Verify webhook delivery in Razorpay dashboard

---

## 🎉 Success!

Your Razorpay integration is complete! Test thoroughly before going live.

**Happy Coding! 🚀**
