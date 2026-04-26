# Auth Backend

This is the backend of my authentication system, built using NestJS. It handles user authentication, authorization, and basic user management.

# Overview

I built this backend to manage secure authentication flows such as user registration, login, and protected routes. The API is structured using NestJS best practices with modular architecture.

# Features
User registration
User login with JWT
Password hashing
Protected routes with guards
Basic error handling
Scalable project structure
Technologies
NestJS
TypeScript
Node.js
JWT (JSON Web Tokens)
bcrypt

# Project Structure

The backend is organized in modules to keep the code clean and maintainable. Each feature has its own module, controller, and service.

# Example structure:

auth/
users/
common/
Installation

# To run the project locally, I follow these steps:

git clone <your-repo-link>
cd auth/backend
npm install
Running the App
npm run start:dev

# The server runs on:

http://localhost:3000
Environment Variables

I use environment variables to store sensitive data like JWT secrets and database configuration.

# Example .env:

JWT_SECRET=your_secret_key
PORT=3000
API Endpoints

# Some of the main routes I implemented:

POST /auth/register → create a new user
POST /auth/login → authenticate user and return token
GET /auth/profile → get user data (protected route)
Authentication

I use JWT-based authentication. After logging in, the user receives a token which must be included in protected requests.

# Notes

This project is part of my learning process with NestJS and backend development. I focused on clean structure and basic authentication logic.
