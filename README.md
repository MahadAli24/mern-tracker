# MERN Task & Notes Tracker

A full-stack task and note management app built with MongoDB, Express, React, and Node. Users can sign up, manage tasks with categories and due dates, search and filter their task list, and keep separate notes — all backed by a real database and secured with JWT authentication.

**Live app:** https://mern-tracker-omega.vercel.app
**Backend API:** https://mern-tracker-production.up.railway.app

## Features

- User signup/login with JWT-based authentication
- Passwords hashed with bcrypt, never stored in plain text
- Full CRUD on tasks — create, edit, mark complete, delete
- Due dates on tasks
- Filter tasks by category, search by title
- Task stats grouped by category (via MongoDB aggregation)
- Full CRUD on notes — create, edit, delete
- Protected routes — no access to tasks/notes without a valid token
- Responsive UI, deployed and live

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios

**Backend**
- Node.js / Express
- MongoDB with Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs

**Deployment**
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

## Running it locally

Clone the repo:
```bash
git clone https://github.com/MahadAli24/mern-tracker.git
cd mern-tracker
```

Set up the backend:
```bash
cd server
npm install
```

Create a `.env` file in `server/` with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend:
```bash
npm run dev
```

Set up the frontend, in a separate terminal:
```bash
cd client
npm install
npm run dev
```

The app will be running at `http://localhost:5173`, connected to your local backend at `http://localhost:5000`.

## What this project covers

Built as a from-scratch learning project — starting with zero prior experience with Node, Express, MongoDB, or React. Covers the full stack: schema design, REST API routes, JWT auth and protected routes, MongoDB aggregation pipelines, React state and hooks, controlled forms, client-side routing, and deploying a split frontend/backend app to production (Vercel + Railway + Atlas).