/**
 * Email Service
 * Handles sending transactional emails for orders
 *
 * Setup Instructions:
 * 1. Install Resend: npm install resend
 * 2. Add to .env.local: RESEND_API_KEY=your_resend_api_key
 * 3. Verify your domain in Resend dashboard
 *
 * Alternative: You can replace Resend with any email service (SendGrid, Mailgun, etc.)
 */

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
  status: string;
  paymentStatus: string;
  currency: string;
  createdAt: number;
  paidAt?: number;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email using Resend
 */
async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    // Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("RESEND_API_KEY not configured. Email not sent.");
      console.log("Would have sent email to:", to);
      console.log("Subject:", subject);
      return false;
    }

    // Dynamic import of Resend (only if API key exists)
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "BreatheX <onboarding@resend.dev>", // Replace with your verified domain
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Email sending error:", error);
      return false;
    }

    console.log("Email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

/**
 * Format currency for display
 */
function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date for display
 */
function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Generate order confirmation email HTML
 */
function generateOrderConfirmationEmail(order: Order): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="80">
              <img src="${item.image}" alt="${item.name}"
                style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
            </td>
            <td style="padding-left: 16px;">
              <div style="font-weight: 600; margin-bottom: 4px;">${item.name}</div>
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
                Size: ${item.size} • Qty: ${item.quantity}
              </div>
              <div style="font-weight: 700; font-size: 16px;">
                ${formatCurrency(item.price * item.quantity, order.currency)}
              </div>
              ${
                item.originalPrice > item.price
                  ? `
                <div style="font-size: 14px; color: #10b981; font-weight: 600;">
                  ${item.discount}% OFF •
                  <span style="text-decoration: line-through; color: #9ca3af;">
                    ${formatCurrency(item.originalPrice * item.quantity, order.currency)}
                  </span>
                </div>
              `
                  : ""
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - ${order.orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #000000 0%, #333333 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">BreatheX</h1>
              <p style="margin: 8px 0 0; color: #e5e7eb; font-size: 14px;">AI POWERED FITNESS</p>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #f0fdf4; border-bottom: 3px solid #10b981;">
              <div style="width: 64px; height: 64px; background-color: #10b981; border-radius: 50%; margin: 0 auto 16px; display: inline-flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 32px;">✓</span>
              </div>
              <h2 style="margin: 0 0 8px; color: #065f46; font-size: 28px; font-weight: 700;">Payment Successful!</h2>
              <p style="margin: 0; color: #047857; font-size: 16px;">Thank you for your order, ${order.userName || "valued customer"}!</p>
            </td>
          </tr>

          <!-- Order Number -->
          <tr>
            <td style="padding: 32px 40px; text-align: center;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Order Number</p>
              <p style="margin: 0; color: #111827; font-size: 24px; font-weight: 700;">${order.orderNumber}</p>
              <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">
                Ordered on ${formatDate(order.createdAt)}
              </p>
            </td>
          </tr>

          <!-- Order Items -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <h3 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 700;">Order Items</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${itemsHtml}
              </table>
            </td>
          </tr>

          <!-- Price Breakdown -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; padding: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Subtotal</td>
                  <td align="right" style="padding: 8px 0; font-weight: 600; color: #111827;">
                    ${formatCurrency(order.subtotal, order.currency)}
                  </td>
                </tr>
                ${
                  order.discount > 0
                    ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Discount</td>
                  <td align="right" style="padding: 8px 0; font-weight: 600; color: #10b981;">
                    -${formatCurrency(order.discount, order.currency)}
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  order.totalSavings > 0
                    ? `
                <tr style="background-color: #d1fae5;">
                  <td style="padding: 12px; border-radius: 8px; font-weight: 600; color: #065f46;">
                    Total Savings
                  </td>
                  <td align="right" style="padding: 12px; border-radius: 8px; font-weight: 700; color: #065f46;">
                    ${formatCurrency(order.totalSavings, order.currency)}
                  </td>
                </tr>
                `
                    : ""
                }
                <tr style="border-top: 2px solid #d1d5db;">
                  <td style="padding: 16px 0 0; font-size: 18px; font-weight: 700; color: #111827;">
                    Total Paid
                  </td>
                  <td align="right" style="padding: 16px 0 0; font-size: 20px; font-weight: 700; color: #111827;">
                    ${formatCurrency(order.totalAmount, order.currency)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call to Action -->
          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://breathex.com"}/orders/${order.orderNumber}"
                style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px;">
                View Order Details
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">
                Need help with your order?
              </p>
              <p style="margin: 0; color: #111827; font-size: 14px;">
                Contact us at <a href="mailto:support@breathex.com" style="color: #000000; font-weight: 600; text-decoration: none;">support@breathex.com</a>
              </p>
              <p style="margin: 16px 0 0; color: #9ca3af; font-size: 12px;">
                © 2025 BreatheX. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(order: Order): Promise<boolean> {
  try {
    const html = generateOrderConfirmationEmail(order);

    return await sendEmail({
      to: order.userEmail,
      subject: `Order Confirmed - ${order.orderNumber} | BreatheX`,
      html: html,
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    return false;
  }
}

/**
 * Send payment failure notification email
 */
export async function sendPaymentFailureEmail(
  userEmail: string,
  orderNumber: string,
  errorMessage: string
): Promise<boolean> {
  try {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Failed - ${orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #fef2f2; border-bottom: 3px solid #ef4444;">
              <div style="width: 64px; height: 64px; background-color: #ef4444; border-radius: 50%; margin: 0 auto 16px; display: inline-flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 32px;">✕</span>
              </div>
              <h2 style="margin: 0 0 8px; color: #991b1b; font-size: 28px; font-weight: 700;">Payment Failed</h2>
              <p style="margin: 0; color: #dc2626; font-size: 16px;">Order ${orderNumber}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 16px; color: #374151; font-size: 16px; line-height: 1.6;">
                We're sorry, but your payment could not be processed for order <strong>${orderNumber}</strong>.
              </p>
              <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Error: ${errorMessage}
              </p>
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://breathex.com"}/shop"
                  style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px;">
                  Try Again
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px; background-color: #f9fafb; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Need help? Contact <a href="mailto:support@breathex.com" style="color: #000000; font-weight: 600;">support@breathex.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    return await sendEmail({
      to: userEmail,
      subject: `Payment Failed - ${orderNumber} | BreatheX`,
      html: html,
    });
  } catch (error) {
    console.error("Failed to send payment failure email:", error);
    return false;
  }
}
