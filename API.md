# Clothing Exchange Marketplace API Documentation

**Base URL**: `http://localhost:5000/api`  
**Authentication Header**: `Authorization: Bearer <JWT_TOKEN>`  
**Content-Type**: `application/json`  

---

## Table of Contents
1. [Health Check](#1-health-check)
2. [Authentication Endpoints (`/api/auth`)](#2-authentication-endpoints-apiauth)
3. [Clothing Items Endpoints (`/api/items`)](#3-clothing-items-endpoints-apiitems)
4. [Swap Requests Endpoints (`/api/swaps`)](#4-swap-requests-endpoints-apiswaps)
5. [Negotiation Chat Endpoints (`/api/chat`)](#5-negotiation-chat-endpoints-apichat)
6. [User Profile Endpoints (`/api/users`)](#6-user-profile-endpoints-apiusers)
7. [Admin Portal Endpoints (`/api/admin`)](#7-admin-portal-endpoints-apiadmin)

---

## 1. Health Check

### `GET /api/health`
Verify API server operational status.

- **Authentication**: None Required
- **Response Format** (`200 OK`):
```json
{
  "status": "OK",
  "message": "Clothing Exchange API v0.1 Running Cleanly",
  "timestamp": "2026-08-01T22:58:00.000Z"
}
```

---

## 2. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Register a new user account and obtain JWT token.

- **Authentication**: None Required
- **Request Body**:
```json
{
  "name": "Julian Thorne",
  "email": "julian@fashionexchange.org",
  "password": "password123",
  "role": "user"
}
```
- **Response Format** (`201 Created`):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "66a000000000000000000003",
    "name": "Julian Thorne",
    "email": "julian@fashionexchange.org",
    "role": "user",
    "avatarUrl": "https://images.unsplash.com/...",
    "location": "New York, NY"
  }
}
```

---

### `POST /api/auth/login`
Authenticate user credentials and receive JWT token.

- **Authentication**: None Required
- **Request Body**:
```json
{
  "email": "marcus@fashionexchange.org",
  "password": "password123"
}
```
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "66a000000000000000000001",
    "name": "Marcus Vance",
    "email": "marcus@fashionexchange.org",
    "role": "admin",
    "avatarUrl": "https://images.unsplash.com/...",
    "location": "Brooklyn, NY"
  }
}
```

---

### `GET /api/auth/me`
Retrieve authenticated user profile.

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Request Body**: None
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "user": {
    "_id": "66a000000000000000000001",
    "name": "Marcus Vance",
    "email": "marcus@fashionexchange.org",
    "role": "admin",
    "bio": "Sustainable wardrobe curator.",
    "location": "Brooklyn, NY",
    "rating": 4.9,
    "swapsCompleted": 14
  }
}
```

---

## 3. Clothing Items Endpoints (`/api/items`)

### `GET /api/items`
Fetch available clothing items with optional query parameters.

- **Authentication**: None Required
- **Query Parameters**:
  - `search` (string): Search in title, description, or brand (e.g. `Levi's`, `jacket`)
  - `category` (string): Filter by category (`Outerwear`, `Dresses`, `Tops`, `Bottoms`, `Footwear`, `Accessories`, `Activewear`)
  - `brand` (string): Filter by brand (`Levi's`, `Zara`, `Nike`, `H&M`, `Uniqlo`, `Adidas`)
  - `size` (string): Filter by size (`XS`, `S`, `M`, `L`, `XL`, `XXL`, `Shoes 8`, `Shoes 9`, `Shoes 10`)
  - `condition` (string): Filter by condition (`Brand New with Tags`, `Like New`, `Gently Used`, `Fair Condition`)
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "count": 6,
  "items": [
    {
      "_id": "66b000000000000000000001",
      "title": "Levi's Classic Trucker Denim Jacket",
      "description": "Authentic Levi's vintage medium wash denim jacket.",
      "category": "Outerwear",
      "brand": "Levi's",
      "size": "L",
      "condition": "Gently Used",
      "gender": "Unisex",
      "images": ["https://images.unsplash.com/..."],
      "owner": {
        "_id": "66a000000000000000000001",
        "name": "Marcus Vance",
        "rating": 4.9
      },
      "status": "available",
      "estimatedValue": 85
    }
  ]
}
```

---

### `GET /api/items/:id`
Fetch single clothing item details by ID.

- **Authentication**: None Required
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "item": {
    "_id": "66b000000000000000000001",
    "title": "Levi's Classic Trucker Denim Jacket",
    "description": "Authentic Levi's vintage medium wash denim jacket in excellent condition.",
    "category": "Outerwear",
    "brand": "Levi's",
    "size": "L",
    "condition": "Gently Used",
    "gender": "Unisex",
    "images": ["https://images.unsplash.com/..."],
    "owner": {
      "_id": "66a000000000000000000001",
      "name": "Marcus Vance",
      "email": "marcus@fashionexchange.org",
      "location": "Brooklyn, NY",
      "rating": 4.9,
      "swapsCompleted": 14
    },
    "status": "available",
    "tags": ["denim", "vintage", "levis"],
    "estimatedValue": 85
  }
}
```

---

### `POST /api/items`
Create a new clothing listing.

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Request Body**:
```json
{
  "title": "Uniqlo AIRism Oversized Crewneck Sweatshirt",
  "description": "Heavyweight AIRism cotton blend sweatshirt in muted olive green.",
  "category": "Tops",
  "brand": "Uniqlo",
  "size": "L",
  "condition": "Like New",
  "gender": "Unisex",
  "images": ["https://images.unsplash.com/..."],
  "estimatedValue": 45,
  "tags": ["uniqlo", "airism", "sweatshirt"]
}
```
- **Response Format** (`201 Created`):
```json
{
  "success": true,
  "item": {
    "_id": "item_1722543600000",
    "title": "Uniqlo AIRism Oversized Crewneck Sweatshirt",
    "category": "Tops",
    "brand": "Uniqlo",
    "size": "L",
    "condition": "Like New",
    "status": "available"
  }
}
```

---

### `PUT /api/items/:id`
Update an existing clothing listing.

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Request Body**:
```json
{
  "title": "Levi's Classic Trucker Denim Jacket (Updated)",
  "condition": "Like New",
  "estimatedValue": 90
}
```
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "item": {
    "_id": "66b000000000000000000001",
    "title": "Levi's Classic Trucker Denim Jacket (Updated)",
    "condition": "Like New"
  }
}
```

---

### `DELETE /api/items/:id`
Delete a clothing item listing.

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "message": "Listing removed successfully"
}
```

---

## 4. Swap Requests Endpoints (`/api/swaps`)

### `GET /api/swaps`
Fetch authenticated user's incoming and outgoing swap requests.

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "count": 1,
  "swaps": [
    {
      "_id": "66c000000000000000000001",
      "requester": {
        "_id": "66a000000000000000000002",
        "name": "Elena Rostova"
      },
      "recipient": {
        "_id": "66a000000000000000000001",
        "name": "Marcus Vance"
      },
      "requestedItem": {
        "_id": "66b000000000000000000001",
        "title": "Levi's Classic Trucker Denim Jacket"
      },
      "offeredItem": {
        "_id": "66b000000000000000000002",
        "title": "Zara Floral Midi Summer Dress"
      },
      "status": "pending",
      "note": "Interested in swapping for the Levi's jacket!",
      "meetupLocation": "Central Park Coffee Shop"
    }
  ]
}
```

---

### `POST /api/swaps`
Submit a new clothing swap proposal.

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Request Body**:
```json
{
  "requestedItemId": "66b000000000000000000001",
  "offeredItemId": "66b000000000000000000002",
  "note": "Hi Marcus! I would love to trade my Zara dress for your Levi's jacket.",
  "meetupLocation": "Downtown Hub"
}
```
- **Response Format** (`201 Created`):
```json
{
  "success": true,
  "swap": {
    "_id": "swap_1722543600000",
    "status": "pending",
    "requestedItem": "66b000000000000000000001",
    "offeredItem": "66b000000000000000000002"
  }
}
```

---

### `PUT /api/swaps/:id/status`
Update swap request status (`accepted`, `rejected`, `completed`, `cancelled`).

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Request Body**:
```json
{
  "status": "accepted"
}
```
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "swap": {
    "_id": "66c000000000000000000001",
    "status": "accepted"
  }
}
```

---

## 5. Negotiation Chat Endpoints (`/api/chat`)

### `GET /api/chat/:swapId`
Retrieve message thread for a specific swap request.

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "messages": [
    {
      "_id": "66d000000000000000000001",
      "swapRequest": "66c000000000000000000001",
      "sender": {
        "_id": "66a000000000000000000002",
        "name": "Elena Rostova",
        "avatarUrl": "https://images.unsplash.com/..."
      },
      "content": "Hi Marcus! Sent you a swap offer for the Levi's Jacket.",
      "createdAt": "2026-07-29T10:01:00.000Z"
    }
  ]
}
```

---

### `POST /api/chat`
Send a negotiation message in a swap request thread.

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Request Body**:
```json
{
  "swapRequestId": "66c000000000000000000001",
  "content": "Sounds great! Let's arrange shipping for tomorrow morning."
}
```
- **Response Format** (`201 Created`):
```json
{
  "success": true,
  "message": {
    "_id": "msg_1722543600000",
    "swapRequest": "66c000000000000000000001",
    "content": "Sounds great! Let's arrange shipping for tomorrow morning.",
    "createdAt": "2026-08-01T22:58:00.000Z"
  }
}
```

---

## 6. User Profile Endpoints (`/api/users`)

### `GET /api/users/:id`
Fetch public user profile and active closet listings.

- **Authentication**: None Required
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "user": {
    "_id": "66a000000000000000000002",
    "name": "Elena Rostova",
    "email": "elena@fashionexchange.org",
    "bio": "Minimalist closet enthusiast.",
    "location": "Austin, TX",
    "swapsCompleted": 8,
    "rating": 4.8
  },
  "listings": [
    {
      "_id": "66b000000000000000000002",
      "title": "Zara Floral Midi Summer Dress"
    }
  ]
}
```

---

### `PUT /api/users/profile`
Update authenticated user's profile details.

- **Authentication**: Required (`Bearer <JWT_TOKEN>`)
- **Request Body**:
```json
{
  "name": "Marcus Vance",
  "location": "New York, NY",
  "bio": "Vintage denim collector & sustainable fashion advocate.",
  "avatarUrl": "https://images.unsplash.com/..."
}
```
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "user": {
    "name": "Marcus Vance",
    "location": "New York, NY",
    "bio": "Vintage denim collector & sustainable fashion advocate."
  }
}
```

---

## 7. Admin Portal Endpoints (`/api/admin`)

### `GET /api/admin/stats`
Fetch system-wide metrics and health indicators.

- **Authentication**: Required (`Bearer <JWT_TOKEN>` with `admin` role)
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "stats": {
    "totalUsers": 3,
    "totalListings": 6,
    "totalSwaps": 1,
    "pendingSwaps": 1,
    "systemHealth": "Operational",
    "uptime": "99.9%"
  }
}
```

---

### `GET /api/admin/users`
Fetch all registered users for administration and moderation.

- **Authentication**: Required (`Bearer <JWT_TOKEN>` with `admin` role)
- **Response Format** (`200 OK`):
```json
{
  "success": true,
  "count": 3,
  "users": [
    {
      "_id": "66a000000000000000000001",
      "name": "Marcus Vance",
      "email": "marcus@fashionexchange.org",
      "role": "admin",
      "location": "Brooklyn, NY",
      "swapsCompleted": 14,
      "rating": 4.9
    }
  ]
}
```
