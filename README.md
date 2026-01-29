# 🏠 Real Trust — Full Stack Real Estate Platform

A modern **full-stack real estate web application** with a powerful **Admin Dashboard** to manage properties, client testimonials, contact messages, and newsletter subscriptions. Built for performance, clean UI/UX, and easy cloud deployment.

## 🚀 Live Demo

- **Website**
- **Backend API**
- **Admin Panel**

---

## ✨ Features

### 👤 User Features

- 🏘️ Browse property listings with optimized images
- 💬 Read client testimonials
- 📧 Contact form with validation
- 📬 Newsletter subscription
- 📱 Fully responsive design
- ⚡ Fast loading with image optimization

### 🛠️ Admin Panel Features

- ✏️ Full CRUD operations for all entities
- 🖼️ Image upload with Cloudinary
- 📊 Real-time statistics dashboard
- 🔍 Search functionality
- 📥 Export data to CSV
- ✅ Form validation & error handling
- 🔔 Toast notifications

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, React Router DOM, Axios, React Toastify, CSS3
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, Cloudinary, Multer
**Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 📂 Project Structure

```bash
real-trust/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vercel.json
└── README.md
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account

---

## 🔧 Installation

### 1) Clone the repository

```bash
git clone https://github.com/nithishkumarbnk/real-trust.git
cd real-trust
```

---

## 🧩 Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`

```env
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=5000
FRONTEND_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

---

## 🎨 Frontend Setup

```bash
cd ../frontend
npm install
```

Create `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

---

## ✅ Access the Application

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Admin Panel**: http://localhost:5173/admin

---

## 🎯 API Endpoints

### Properties / Projects

- `GET /api/projects` — Get all projects
- `POST /api/projects` — Create project (with image upload)
- `PUT /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project

### Clients / Testimonials

- `GET /api/clients` — Get all clients
- `POST /api/clients` — Create client (with image upload)
- `DELETE /api/clients/:id` — Delete client

### Contacts

- `GET /api/contacts` — Get all contacts
- `POST /api/contacts` — Create contact
- `DELETE /api/contacts/:id` — Delete contact

### Newsletter

- `GET /api/newsletter` — Get all subscribers
- `POST /api/newsletter` — Add subscriber
- `DELETE /api/newsletter/:id` — Delete subscriber

---

## 🚀 Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Create a new Web Service on Render
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables
5. Deploy ✅

### Deploy Frontend to Vercel

Create `frontend/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Then deploy:

- **Framework**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- Add environment variable: `VITE_API_URL`

---

## 🧪 Testing

```bash
# Test backend health
curl https://real-trust-00fu.onrender.com/api/health

# Test API endpoint
curl https://real-trust-00fu.onrender.com/api/projects
```

---

## 🛡️ Security

✅ CORS protection
✅ Environment variables for secrets
✅ Input validation (client & server)
✅ File type & size restrictions
✅ HTTPS encryption

---

## 🐛 Known Issues

- Render Free Tier: backend sleeps after inactivity (cold start delay)
- MongoDB Atlas Free: limited storage
- Cloudinary Free: limited bandwidth & storage

---

## 👨‍💻 Author

**Nithish Kumar**📍 Guntur, Andhra Pradesh, India

- GitHub: `@nithishkumarbnk`
