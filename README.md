# Clothing Exchange & Swap Marketplace

> **Unified Mentor Internship Program Project**  
> A full-stack MERN marketplace platform enabling sustainable fashion through 1:1 clothing exchanges instead of new purchases.

---

## 📌 Overview

The **Clothing Exchange & Swap Marketplace** allows users to list pre-loved garments, discover items uploaded by other fashion enthusiasts, send swap proposals, negotiate exchange terms in real time, and manage completed clothing swaps.

This repository represents **Version 0.1**, designed with scalable modular architecture, RESTful API endpoints, MongoDB Mongoose schemas, JWT authentication, and functional wireframe UI components built with React and Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite SPA)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **Environment**: Dotenv & CORS

---

## ✨ Features List

- **User Authentication**: Sign Up, Sign In, JWT session management, role-based permissions (`user` / `admin`).
- **Marketplace Browsing**: Live title/brand/description search with filter panel for category, brand, size, and garment condition.
- **Garment Detail View**: Detailed product specifications, image galleries, estimated values, tags, and seller trust ratings.
- **Clothing Upload**: Form for publishing pre-loved clothing items to personal closets.
- **Swap Proposal Workflow**: Offer an item from your closet in return for a requested garment with custom proposal notes.
- **Swap Request Management**: View incoming & outgoing swap offers, accept or decline proposals, and filter by exchange status (`pending`, `accepted`, `rejected`, `completed`).
- **Negotiation Chat**: 1:1 message channel per swap request for sizing questions, fabric condition details, and shipping/meetup logistics.
- **User Dashboard & Profile**: Overview stats, active closet listings, swap history logs, and profile location/bio editor.
- **Admin Moderation Portal**: System telemetry, total platform counts, active uptime monitor, and registered user accounts table.

---

## 📁 Folder Structure Overview

```
Clothing-brand-website/
├── client/                      # Frontend Application (React + Vite + Tailwind CSS)
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── chat/            # ChatWindow
│   │   │   ├── common/          # Navbar, Footer, Sidebar, Modal
│   │   │   ├── dashboard/       # DashboardStats, ProfileCard
│   │   │   ├── listings/        # ListingCard, SearchBar, FilterPanel
│   │   │   └── swaps/           # SwapCard
│   │   ├── context/             # AuthContext (global state & JWT)
│   │   ├── layouts/             # MainLayout, AuthLayout, DashboardLayout, AdminLayout
│   │   ├── pages/               # 12 Application Pages
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ItemDetailsPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MarketplacePage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── SwapRequestsPage.jsx
│   │   │   └── UploadItemPage.jsx
│   │   ├── services/            # Axios API instances (authService, itemService, swapService)
│   │   ├── App.jsx              # React Router setup
│   │   ├── index.css            # Tailwind baseline styles
│   │   └── main.jsx             # React entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                      # Backend Application (Node.js + Express + MongoDB)
    ├── src/
    │   ├── config/              # Database connection (db.js)
    │   ├── controllers/         # Handlers (auth, items, swaps, chat, users, admin)
    │   ├── middleware/          # authMiddleware, errorMiddleware
    │   ├── models/              # Mongoose Schemas (User, ClothingItem, SwapRequest, Message, Notification)
    │   ├── routes/              # Express API Routes (auth, items, swaps, chat, users, admin)
    │   ├── utils/               # Realistic seed data & database seeder
    │   └── app.js               # Express application initialization
    ├── .env.example
    ├── package.json
    └── server.js                # Server listener entry point
```

---

## 🚀 Local Setup & Installation Instructions

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or MongoDB Atlas connection string (Optional: app includes seamless in-memory seed fallback if MongoDB is not running).

---

### 1. Clone & Set Up Environment

```bash
git clone https://github.com/LORDXMANOJ/Clothing-brand-website.git
cd Clothing-brand-website
```

---

### 2. Run Backend Server (`server/`)

1. Navigate to `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
2. (Optional) Create a `.env` file inside `server/` (or use default fallback):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/clothing_swap_db
   JWT_SECRET=super_secret_clothing_swap_jwt_key_2026
   NODE_ENV=development
   ```
3. Start the Express backend server:
   ```bash
   npm run dev
   ```
   *The server runs on `http://localhost:5000` with health check at `http://localhost:5000/api/health`.*

---

### 3. Run Frontend Application (`client/`)

1. Open a new terminal tab, navigate to `client` directory and install dependencies:
   ```bash
   cd client
   npm install
   ```
2. Launch the Vite dev server:
   ```bash
   npm run dev
   ```
3. Open your browser at `http://localhost:3000`.

---

## 🔑 Quick Test Credentials

- **Admin Account**: `marcus@fashionexchange.org` / `password123`
- **Standard User**: `elena@fashionexchange.org` / `password123`
