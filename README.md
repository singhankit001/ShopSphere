# ShopSphere - Premium Quick-Commerce Platform

**Project Mission:** To deliver a premium, instant-commerce experience with hyper-fast local delivery, enabling users to shop for groceries and essentials seamlessly. 

**Tech Stack:** 
- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Design:** Glassmorphism UI, Responsive Grids, Premium Visual Hierarchy

## Key Features
- **8-Minute Delivery:** Seamless quick-commerce layout optimized for speed and conversion.
- **Resilient Data Layer:** Fallback data mechanisms ensure the app remains functional even if the backend database experiences downtime.
- **Premium UI/UX:** High-fidelity design with smooth animations, dark-mode accents, and zero-jank React Router transitions.
- **Robust State Management:** Redux-powered cart and auth flow with strict error boundaries.

## Local Setup Instructions

1. **Clone & Install Dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

2. **Environment Variables**
   - Copy `server/.env.example` to `server/.env` and update MongoDB credentials.
   - Copy `client/.env.example` to `client/.env` and configure VITE_API_URL if needed (defaults to localhost:5001).

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

## Deployment Instructions

### Backend (Render / Heroku)
1. Push your code to GitHub.
2. Create a new Web Service on Render.
3. Set the Root Directory to `server`.
4. Set the Build Command to `npm install` and Start Command to `npm start`.
5. Add your Environment Variables (`MONGO_URI`, `PORT`, `JWT_SECRET`).
6. Deploy! Copy the assigned URL.

### Frontend (Vercel)
1. Import your GitHub repository to Vercel.
2. Set the Root Directory to `client`.
3. Vercel will automatically detect Vite. Build command: `npm run build`, Output dir: `dist`.
4. Add the Environment Variable `VITE_API_URL` and paste your Render Backend URL (e.g., `https://your-app.onrender.com/api`).
5. Deploy!

---
*Built for production scale and resilience.*
