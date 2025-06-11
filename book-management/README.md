# 📚 Book Management REST API – Zappyrent Technical Assessment

A RESTful API built with **Express.js** and **TypeScript** for managing personal book collections.  
Designed as a submission for the **Zappyrent backend technical assessment**.

---

## 🚀 Features

- ✅ User registration & login
- ✅ JWT authentication
- ✅ CRUD operations for books
- ✅ User-specific access control (each user accesses only their own books)
- ✅ Dockerized PostgreSQL database
- ✅ Swagger documentation (YAML-based)
- ✅ Clean code with ESLint, Prettier, Husky
- ✅ Adminer GUI for PostgreSQL management
- ✅ Scripts for development and build
- ✅ Testing setup with Vitest and Supertest

## 📘 Book Model

| Field           | Type     | Description               |
|----------------|----------|---------------------------|
| `id`           | UUID     | Auto-generated identifier |
| `title`        | string   | Book title                |
| `author`       | string   | Author name               |
| `description`  | string   | *(optional)*              |
| `year`         | number   | Year of publication       |
| `cover_image_url`| string   | *(optional)*              |

---

## 👤 User Model

| Field       | Type   | Description                    |
|-------------|--------|--------------------------------|
| `id`        | UUID   | Auto-generated identifier      |
| `email`     | string | Unique email address           |
| `password`  | string | Hashed password (not exposed)  |
| `createdAt` | Date   | Timestamp of registration      |


## 🛠️ Tech Stack

- **Node.js + Express**
- **TypeScript**
- **PostgreSQL** (via Docker)
- **JWT** for authentication
- **Swagger** for API docs
- **ESLint + Prettier + Husky** for linting and formatting
- **Vitest + Supertest** for testing
- **Adminer** for visual database access

---

## 🐳 Docker Setup

To run the project and services (PostgreSQL + Adminer):

```bash
docker-compose up --build
```

- **App**: [http://localhost:3000](http://localhost:3000)

- **Swagger Docs**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

- **Adminer** (PostgreSQL GUI): [http://localhost:8080](http://localhost:8080)
  - **System**: PostgreSQL
  - **Server**: `db` или `localhost`
  - **User**: `postgres`
  - **Password**: `postgres`
  - **Database**: `books`
