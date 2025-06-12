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

## 📡 API Endpoints (Base URL: `/`)

### Auth
- `POST /auth/register` — Register new user
- `POST /auth/login` — Login user and receive JWT

### Books (protected)
- `GET /books` — Get paginated list of user's books
- `GET /books/:id` — Get a single book by ID
- `POST /books` — Create a new book
- `PUT /books/:id` — Update a book
- `DELETE /books/:id` — Delete a book

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


## 🗂️ Project Structure

```
src/
├── controllers/   # Request handlers for each route (business logic entrypoint)
├── services/      # Core business logic and database interaction
├── models/        # TypeScript types and interfaces for data models
├── routes/        # Express route definitions and routers
├── middlewares/   # Express middlewares (auth, error handling, etc.)
├── utils/         # Utility/helper functions (e.g., logger, pagination)
├── validators/    # Input validation logic and field guards
├── config/        # Configuration files (DB, JWT, etc.)
├── __tests__/     # Integration and unit tests
```

Each folder is responsible for a specific concern, following clean architecture and separation of concerns. This structure makes the codebase easy to navigate, maintain, and extend.

## 📦 Scripts

Common scripts for development and testing:

```bash
npm run dev         # Start development server with hot reload
npm run build       # Build the project (TypeScript + Swagger docs)
npm run lint        # Run ESLint for code quality
npm run format      # Format code with Prettier
npm test            # Run all tests (Vitest)
```

See `package.json` for the full list of available scripts.

## 🧠 Potential Improvements

- Add refresh token mechanism for better session control
- Rate limiting & brute-force protection (e.g., `express-rate-limit`)
- Password reset via email
- User profile management
- CI/CD pipeline (e.g., GitHub Actions)
- More granular role-based access control (RBAC)
