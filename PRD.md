# Product Requirements Document (PRD)

## Project Name: Clothing Exchange & Swap Marketplace
**Target Platform**: Web Application (Full-Stack MERN)  
**Program**: Unified Mentor Internship Program  
**Version**: 0.1 Foundation  

---

## 1. Project Overview & Problem Statement

Fast fashion and rapid garment consumption contribute significantly to environmental waste, resource depletion, and unnecessary household expenditure. Many individuals own gently worn or like-new clothing items that remain unused in closets.

The **Clothing Exchange & Swap Marketplace** is a peer-to-peer web application designed to encourage sustainable fashion choices. It provides a platform where users can upload pre-loved clothing items, discover apparel from other community members, propose direct 1:1 item exchanges, negotiate exchange logistics, and complete clothing swaps without financial transactions.

---

## 2. Core Objectives & Key Metrics

### Objectives
1. **Promote Sustainability**: Extend the lifespan of wearable clothing and minimize textile waste.
2. **Seamless Peer-to-Peer Swapping**: Deliver an intuitive interface for discovering clothing, submitting swap proposals, and negotiating terms.
3. **Trust & Transparency**: Enable user ratings, item condition badges, and transparent user profiles to build community trust.
4. **Scalable System Architecture**: Establish a production-ready, decoupled MERN architecture with clean API contracts.

### Success Metrics (KPIs)
- Number of active listings published per month.
- Ratio of swap proposals submitted vs. accepted/completed swaps.
- User engagement in negotiation channels.
- Platform uptime (target 99.9%) and page load performance.

---

## 3. User Personas & User Stories

### User Personas
- **Sustainable Swapper (Standard User)**: Looking to refresh their wardrobe sustainably by trading clothes they no longer wear.
- **Collector / Fashion Enthusiast**: Seeking specific vintage, brand-name, or limited-run pieces (e.g., Levi's denim jackets, retro sneakers).
- **Platform Moderator (Admin User)**: Responsible for overseeing platform activity, user compliance, and system health metrics.

### User Stories
- **US-01**: As a user, I want to create an account and log in securely so that I can manage my closet listings and swap requests.
- **US-02**: As a user, I want to search and filter clothing listings by category, size, brand, and condition so that I can quickly find apparel that fits my style and size.
- **US-03**: As a user, I want to view detailed product information, images, estimated value, and owner rating before proposing a swap.
- **US-04**: As a user, I want to offer an item from my closet in exchange for another user's listing so that I can initiate a swap.
- **US-05**: As a user, I want to review incoming swap proposals and accept or decline them based on offered garments.
- **US-06**: As a user, I want to chat directly with swap partners to discuss garment measurements, shipping details, or local meetup locations.
- **US-07**: As an admin, I want to view platform statistics and user account tables to ensure platform safety and monitor active swaps.

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization
- User Registration (`name`, `email`, `password`, `role`).
- Password encryption using `bcryptjs`.
- Session management via JSON Web Tokens (JWT).
- Protected API routes and client-side route guards for standard and admin roles.

### 4.2 Clothing Listings Management
- Create listing (`title`, `brand`, `category`, `size`, `condition`, `gender`, `images`, `description`, `estimatedValue`, `tags`).
- Update and delete existing user listings.
- Live keyword search across title, brand, and description.
- Filter panel for Category (*Outerwear*, *Dresses*, *Tops*, *Bottoms*, *Footwear*, etc.), Brand (*Levi's*, *Zara*, *Nike*, *H&M*, *Uniqlo*, *Adidas*), Size, and Condition (*Brand New with Tags*, *Like New*, *Gently Used*, *Fair Condition*).

### 4.3 Swap Request Engine
- Submit swap proposals selecting an item from the user's closet in exchange for a target listing.
- Attach custom proposal notes and preferred exchange locations.
- Swap status workflow: `pending` -> `accepted` / `rejected` -> `completed` / `cancelled`.
- Filter swap request lists by status.

### 4.4 1:1 Negotiation Chat
- Real-time or polled messaging thread attached to individual swap requests.
- Message history tracking sender, timestamp, and message content.

### 4.5 User Dashboard & Profile
- Overview cards displaying Active Listings, Pending Swaps, Completed Swaps, and Total Views.
- User profile editing (`name`, `location`, `bio`, `avatarUrl`).
- Public trust rating and swap completion stats.

### 4.6 Admin Moderation Portal
- High-level telemetry: Total Users, Active Garment Listings, Total Swaps Created, Service Health.
- Comprehensive user accounts management table displaying email, role, location, completed swaps, and ratings.

---

## 5. Non-Functional Requirements (NFRs)

- **Performance**: API response times under 200ms; frontend bundle built with Vite for fast initial load times (<2s).
- **Scalability**: Decoupled architecture allowing independent scaling of API servers and SPA static assets.
- **Usability & Layout**: Clean, responsive wireframe layouts using Tailwind CSS; intuitive navigation across all screen sizes.
- **Maintainability**: Modular folder structure (`controllers`, `models`, `routes`, `services`, `components`, `pages`) following industry best practices.
- **Security**: Environment variable isolation, password hashing, JWT authorization headers, CORS protection.

---

## 6. Technology Stack Architecture

- **Frontend**: React 18, React Router v6, Tailwind CSS, Axios, Lucide React Icons, Vite.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose ODM, JWT, bcryptjs.
- **Deployment Strategy**: Frontend hostable on Vercel/Netlify; Backend hostable on Render/Railway; Database on MongoDB Atlas.

---

## 7. Version 0.1 Deliverables vs. Future Roadmap

| Feature / Subsystem | Version 0.1 (Current Status) | Future Releases (v0.2+) |
| :--- | :--- | :--- |
| **Authentication** | JWT Auth with localStorage persistence & mock/DB fallback | Social Auth (Google/GitHub OAuth), Email Verification |
| **Marketplace Search** | Client & Server filtering by category, size, brand, condition | Algorithmic Recommendation Engine, Saved Search Alerts |
| **Swap Workflow** | Direct 1:1 item exchange proposals & status tracking | Multi-item bundling & token-based points system |
| **Negotiation Chat** | REST-based polling chat channel per swap request | WebSockets (Socket.io) real-time messaging & image attachments |
| **Media Handling** | Direct image URL links & Cloudinary setup placeholders | Direct file drag-and-drop Cloudinary CDN uploads |
| **Admin Portal** | System stats dashboard & user management table | Automated content moderation, reporting/flagging tools |

---

## 8. Verification & Acceptance Criteria

- All 12 application pages render correctly and handle user interactions.
- Frontend builds cleanly via `npm run build` without syntax or dependency errors.
- Backend server initializes and registers API routes on startup.
- Authenticated endpoints enforce JWT verification and role authorization.
