# Jobify - Full Stack Job Tracking Application

A production-ready job tracking platform built with the MERN stack, migrated to PostgreSQL using Prisma ORM. It allows users to manage job applications, track progress, view analytics, and manage profiles securely.

## Live Link

https://jobify-fullstack-6n36.onrender.com/


## Features

- User authentication with JWT and HTTP-only cookies
- Role-Based Access Control (User/Admin)
- Create, Read, Update, Delete job applications
- Job filtering, searching, and sorting
- Dashboard analytics and statistics
- Profile management
- Cloudinary image uploads
- Responsive dashboard UI
- Protected routes and authorization middleware
- CI/CD pipeline with GitHub Actions and Render


## Tech Stack

### Frontend
- React.js
- TypeScript
- React Router
- React Query
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Tools & Deployment
- Git & GitHub
- GitHub Actions
- Render
- Cloudinary
- Postman


## CI/CD Pipeline

Implemented automated CI/CD workflow:

- GitHub Actions runs build validation on commits
- Automatic dependency installation
- Prisma client generation
- Production build verification
- Render Auto Deploy deploys successful commits


## Database

PostgreSQL database managed using Prisma ORM.

Main models:

- User
- Job

Relationships:

- One user can create multiple jobs
- Cascade delete support


## Installation

Clone repository

```bash
git clone https://github.com/GanapuramSharath/jobify-fullstack.git
```

Install dependencies

```bash
npm install
```

Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

Run development server

```bash
npm run dev
```


## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

JWT_SECRET=

JWT_EXPIRES_IN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```


## Author

Ganapuram Sharath Teja

- Full Stack Developer
- React | Node.js | TypeScript | PostgreSQL
