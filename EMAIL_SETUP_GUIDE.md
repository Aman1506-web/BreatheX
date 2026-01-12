# 📧 Email Setup Guide - Order Confirmation Emails

## 🎯 Quick Answer

The email sender address is what customers see when they receive order confirmation emails. You need to set this up with an email service.

---

## ✅ Best Option: Resend (Recommended)

### **Why Resend?**
- ✅ **Free**: 3,000 emails/month
- ✅ **Fast Setup**: 5 minutes
- ✅ **No Credit Card**: For free tier
- ✅ **Great Deliverability**: Emails won't go to spam
- ✅ **Modern API**: Easy to integrate

### **Setup Steps:**

#### **Step 1: Sign Up**
1. Go to [resend.com](https://resend.com)
2. Click **"Sign Up"**
3. Use your email or GitHub

#### **Step 2: Get API Key**
1. After login, go to **"API Keys"**
2. Click **"Create API Key"**
3. Copy the key (starts with `re_`)

#### **Step 3: Add to Environment**
Add to `.env.local`:
```env
RESEND_API_KEY=re_your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### **Step 4: Choose Email Address**

**Option A: Use Resend's Domain (Instant)**
```typescript
// src/lib/email.ts line 48
from: "BreatheX <onboarding@resend.dev>"
```
✅ Works immediately, no domain setup needed!

**Option B: Use Your Own Domain (Professional)**
```typescript
// src/lib/email.ts line 48
from: "BreatheX <orders@breathex.com>"
```

To use your domain:
1. Go to Resend Dashboard → **Domains**
2. Click **"Add Domain"**
3. Enter: `breathex.com`
4. Add DNS records:
   - **TXT Record** for verification
   - **CNAME Records** for sending
   - **MX Records** (optional, for receiving)
5. Wait for verification (5-30 minutes)

#### **Step 5: Install Package**
```bash
npm install resend
```

#### **Step 6: Done!**
Emails will now be sent when:
- Payment is successful
- Payment fails

---

## 🔄 Alternative: Gmail SMTP (Free but Limited)

### **When to Use:**
- Don't want to sign up for another service
- Small volume (< 500 emails/day)
- Just for testing

### **Limitations:**
- ⚠️ Gmail limits: 500 emails/day
- ⚠️ May go to spam for some users
- ⚠️ Less reliable for transactional emails

### **Setup Steps:**

#### **Step 1: Enable 2-Factor Authentication**
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security**
3. Enable **2-Step Verification**

#### **Step 2: Generate App Password**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **"Mail"** and **"Other (Custom name)"**
3. Name it: "BreatheX App"
4. Click **Generate**
5. Copy the 16-character password

#### **Step 3: Add to Environment**
```env
# .env.local
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-password
```

#### **Step 4: Install Nodemailer**
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

#### **Step 5: Update Email Service**
Replace Resend code in `src/lib/email.ts` with Gmail code from `src/lib/email-gmail.ts`

---

## 🚀 Quick Start (Fastest Way)

**Want to start immediately without domain setup?**

### **Just Change One Line:**

In `src/lib/email.ts` at line 48:
```typescript
// Change from:
from: "BreatheX <orders@yourdomain.com>",

// To:
from: "BreatheX <onboarding@resend.dev>",
```

Then:
```bash
# Install Resend
npm install resend

# Add API key to .env.local
RESEND_API_KEY=re_your_api_key_from_resend
```

**Done!** Emails work immediately! 🎉

---

## 🧪 Testing Emails

### **Test Locally:**

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Make a test purchase with test card:
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: Any future date

3. Check your email!

### **Check Resend Dashboard:**
- Go to **Logs** tab
- See all sent emails
- Check delivery status

---

## 📋 Environment Variables Summary

### **For Resend (Recommended):**
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **For Gmail (Alternative):**
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

---

## ❓ Common Issues

### **"Module 'resend' not found"**
**Solution:**
```bash
npm install resend
```

### **"RESEND_API_KEY not configured"**
**Solution:**
- Check `.env.local` file exists
- Verify API key is correct
- Restart dev server: `npm run dev`

### **Emails not sending**
**Solution:**
1. Check console logs for errors
2. Verify API key in Resend dashboard
3. Check Resend logs for delivery status
4. Make sure email code is uncommented in webhook

### **Emails going to spam**
**Solution:**
- Use Resend with verified domain (not Gmail)
- Add SPF, DKIM, DMARC records
- Warm up your domain (send gradually increasing volumes)

---

## 🎨 Customize Email Template

Edit `src/lib/email.ts`:

### **Change Company Name:**
```typescript
// Line 163
<h1 style="...">YourBrandName</h1>
```

### **Change Colors:**
```typescript
// Line 158 - Header gradient
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);

// Line 176 - Success background
background-color: #your-success-color;
```

### **Add Logo:**
```typescript
// Line 162
<img src="https://yourdomain.com/logo.png" alt="Logo" style="height: 40px;" />
```

### **Change Support Email:**
```typescript
// Line 341
<a href="mailto:support@yourdomain.com">support@yourdomain.com</a>
```

---

## 📞 Need Help?

### **Resend Support:**
- [Resend Documentation](https://resend.com/docs)
- [Resend Discord](https://resend.com/discord)

### **Email Template Issues:**
- Test with [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com/)
- Preview in different email clients

---

## ✅ Production Checklist

Before going live:
- [ ] Set up Resend account
- [ ] Get API key
- [ ] Verify your domain in Resend
- [ ] Update sender email to your domain
- [ ] Test email delivery
- [ ] Check spam folder
- [ ] Customize email template with your branding
- [ ] Add support email
- [ ] Test on different email clients (Gmail, Outlook, etc.)

---

## 🎉 You're Done!

Your order confirmation emails are ready! Customers will receive beautiful, professional emails after every purchase.

**Happy Emailing! 📧**
