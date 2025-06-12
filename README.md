# 📁 Portfolio Website with CMS – Full Stack Project

A full-stack developer portfolio website with CMS (Content Management System) capabilities that lets you **add, edit, and delete** projects, update your profile, manage skills, and handle contact forms through an interactive dashboard.

---

## 🚀 Features

- ✨ Beautiful portfolio homepage
- 🛠️ Admin Dashboard for authenticated users
- 🧑 User registration and login (JWT auth)
- 📂 Add, update, delete projects
- 📝 Editable "About Me" and "Skills" sections
- 📬 Contact form with email integration
- 🔐 Protected routes via middleware

---

## 🧰 Tech Stack

**Frontend:**
- React.js
- Axios
- React Router
- Custom CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT Authentication
- dotenv
- nodemon

---

## 📦 Folder Structure

```
/client              # React frontend
/server              # Express backend
├── controllers      # Business logic for routes
├── models           # Mongoose schemas
├── routes           # Express routes
├── middleware       # Auth middleware
├── .env             # Environment variables
└── index.js         # Server entry point
```

---

## ⚙️ Setup Instructions

### 📌 Prerequisites
- Node.js (v16+)
- MongoDB Atlas or local MongoDB
- npm or yarn

### 🛠 Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run the backend:
```bash
npm start
```

### 💻 Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🔐 API Routes

**User Routes (`/api/users`)**
- `POST /register` – Register a new user
- `POST /login` – Login and receive JWT
- `GET /profile` – Get user profile *(protected)*
- `PUT /profile` – Update user profile *(protected)*
- `PUT /password` – Change password *(protected)*

**Project Routes (`/api/projects`)**
- `GET /` – Public: Get all projects
- `POST /` – Add project *(protected)*
- `PUT /:id` – Update project *(protected)*
- `DELETE /:id` – Delete project *(protected)*

---

## 🧪 Testing with Postman

Use Postman to:
- Register & login
- Copy the returned JWT token
- Use it in **Authorization header** like:
  ```
  Authorization: Bearer <your_token_here>
  ```

---

## 📬 Contact & Feedback

If you have feedback or questions, feel free to raise an issue or contact me.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).