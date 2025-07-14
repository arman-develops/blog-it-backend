# 📝 Blog-It API

This is the backend API for **Blog-It**, a blogging platform built with **Node.js**, **TypeScript**, **Prisma**, and **PostgreSQL**.

---

## 🚀 Features

- User registration, login, and logout
- JWT-based authentication
- Password strength validation using `zxcvbn`
- Create, update, delete, and fetch blogs
- User profile and password management
- Markdown-supported blog content

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT for auth**
- **zxcvbn** for password strength validation

---

## 📦 Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/blog-it-backend.git
   cd blog-it-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env`**
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/blogit
   JWT_KEY=your_jwt_secret_key
   ```

4. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the dev server**
   ```bash
   npm run dev
   ```

---

## 📚 API Endpoints

### 🔐 Auth

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | `/api/auth/register`  | Register a user     |
| POST   | `/api/auth/login`     | Login a user        |
| POST   | `/api/auth/logout`    | Logout a user       |

---

### 🧑‍💻 User

| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| PATCH  | `/api/user`            | Update user profile              |
| PATCH  | `/api/user/password`   | Update user password             |
| GET    | `/api/user/blogs`      | Get all blogs for logged-in user |

---

### 📖 Blogs

| Method | Endpoint                | Description             |
|--------|-------------------------|-------------------------|
| GET    | `/api/blogs`            | Get all blogs           |
| POST   | `/api/blogs`            | Create a new blog       |
| GET    | `/api/blogs/:blogId`    | Get a specific blog     |
| PATCH  | `/api/blogs/:blogId`    | Update a specific blog  |
| DELETE | `/api/blogs/:blogId`    | Delete a specific blog  |

---

## 🔐 Authentication

- **JWT tokens** are required for all user and blog routes (except login and register).
- Include your token in the `Authorization` header:
  ```
  Authorization: Bearer <your_token_here>
  ```
