# 🛍️ ShopSphere

### Instant grocery delivery for the modern consumer.
A production-grade quick-commerce platform focused on speed, user intent, and high-fidelity product discovery.

> Built with product thinking, not just code.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

---

## ⚡ Highlights

*   **Sub-100ms Interactions:** Optimised transitions and asset loading for zero-jank browsing.
*   **Structured Catalog:** A high-fidelity, slug-based product mapping system.
*   **Intent-Driven UX:** Category-first navigation designed for high-speed discovery.
*   **Conversion-Ready:** Robust cart management and a seamless checkout flow.
*   **Resilient Design:** Mobile-first, glassmorphic UI with local data fallbacks for maximum uptime.

---

## 🖼️ Preview

| Homepage | Products | Cart | Categories |
| :---: | :---: | :---: | :---: |
| [Home](./assets/screens/home.png) | [Catalog](./assets/screens/products.png) | [Checkout](./assets/screens/cart.png) | [Browse](./assets/screens/categories.png) |

---

## 🏗️ Architecture

ShopSphere uses a modular, feature-first structure to ensure maintainability as the project scales.

*   **Features:** Encapsulated domain logic (e.g., Cart, Search, Auth).
*   **Components:** Reusable UI primitives following a strict design system.
*   **Services/Hooks:** Clean API abstraction and shared state management.
*   **Utils:** Pure functions for data formatting and performance tweaks.

---

## ⚙️ Tech Stack

*   **Frontend:** React 19 + Vite (HMR focus)
*   **Styling:** Tailwind CSS (Custom Design Tokens)
*   **Navigation:** React Router 7
*   **State:** Redux Toolkit + Custom Hooks

---

## 📁 Folder Structure

```text
src/
├── assets/      # Optimized branding and icons
├── components/  # Atomic design: /ui, /common, /features
├── data/        # Static catalog and fallback datasets
├── store/       # Redux Toolkit state management
├── hooks/       # Custom React lifecycle logic
├── utils/       # Formatting and validation helpers
└── constants/   # Global configurations and constants
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/singhankit001/ShopSphere.git

# 2. Enter project directory
cd shopsphere/client

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

---

## 🧠 Key Features

*   **Dynamic Filtering:** Instant UI updates using URL-synced state management.
*   **Category System:** Logical SKU clustering to mimic real-world shelf browsing.
*   **Cart Logic:** Real-time quantity sync and persistent state across sessions.
*   **UI Consistency:** Meticulously crafted using a bespoke 8px grid system.

---

## 📈 Roadmap

*   **Payments:** Integration with Stripe and UPI gateways.
*   **Live Tracking:** Socket-based delivery partner monitoring.
*   **Advanced Auth:** Complete JWT-based secure session handling.
*   **Backend:** High-scale Node.js/MongoDB microservices.

---

**Built with attention to usability, performance, and real-world scalability.**
