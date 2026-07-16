# 🏓 Padel Booking System

A modern full-stack padel court booking application built with **Next.js**, **TypeScript**, **MongoDB**, and **React Query**.

Users can authenticate with OTP, reserve courts, complete online payments via ZarinPal, and manage their bookings through a clean and responsive interface.

---

## ✨ Features

- OTP Authentication
- JWT & Protected Routes
- Court Booking
- Real-time Slot Availability
- ZarinPal Payment Integration
- Payment Verification
- My Bookings
- Admin Court Management
- Responsive UI

---

## 🚀 Tech Stack

**Frontend**

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query

**Backend**

- Next.js Route Handlers
- MongoDB
- Mongoose
- JWT Authentication

---

## 📦 Installation

```bash
git clone https://github.com/mehrbod1384/padel-booking-system.git

cd padel-booking-system

npm install

npm run dev
```

---

## 🔑 Environment Variables

```env
DATABASE=mongodb+srv://mehrbod:mehrbod1384@padel-booking-system.7t1jbuc.mongodb.net/padel-booking-system

JWT_SECRET=my_super_secret_key

ZARINPAL_MERCHANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

NEXT_PUBLIC_APP_URL=https://padel-booking-system-sable.vercel.app
```

---

## 📋 Booking Flow

```text
Login
   ↓
Choose Court
   ↓
Choose Date & Time
   ↓
Online Payment
   ↓
Payment Verification
   ↓
Reservation Confirmed
```

---

## 📄 License

This project is built for educational and portfolio purposes.

---

**Developed by Mehrbod Moteghaedi**
