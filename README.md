# Venclux Storefront & Administrative Portal

Venclux is a vertical Micro-SaaS e-commerce infrastructure built to enable vendors to instantaneously provision custom digital storefronts. This repository houses the client-side single-page application (SPA), featuring a comprehensive vendor administration dashboard, multi-part form asset upload management pipelines, real-time live preview configuration states, and a fast, responsive public marketplace layer.

## 🚀 Technical Stack
- **Core Engine:** React 18 (Hooks, Dynamic Context API Architecture)
- **Build Toolchain:** Vite JS (Hot Module Replacement)
- **Styling Framework:** Tailwind CSS
- **Iconography Suite:** Lucide React
- **Network Layer:** Axios (Centralized Instance Interceptors configuration)

---

## 🛠️ System Features
- **Dynamic Vendor Sub-slug Routing:** Automatic string parsing for customized `/shop/:storeSlug` routes.
- **Media Asset Integration:** Directly handles file state buffering before passing binary payload streams safely to Cloudinary CDN configurations.
- **Client-Side Reactive Cart System:** Persisted context layers for multi-product state modifications and dynamic checkout computations.
- **Granular Filter Matrix:** Client-side combined category selection and regex-matching search parameters processing.

---

## 💻 Local Development Setup

### 1. Prerequisites
Ensure you have **Node.js (v18.x or higher)** and **npm (v9.x or higher)** installed on your machine.

### 2. Installation
Navigate into the client folder directory and fetch system packages:
```bash
cd frontend
npm install