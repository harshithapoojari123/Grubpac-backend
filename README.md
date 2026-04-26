# 📡 Content Broadcasting System – Backend

A backend system for managing educational content broadcasting where teachers upload content, principals approve/reject it, and students access live scheduled content through a public API.

This project demonstrates real-world backend concepts like authentication, RBAC, file uploads, approval workflows, and time-based scheduling.

---

## 🚀 Tech Stack

Node.js, Express.js, MySQL, Sequelize, JWT, bcrypt, Multer

---

## 📁 Project Structure

src/
- controllers/
- routes/
- models/
- middlewares/
- config/
uploads/
app.js
.env
.env.example

---

## ⚙️ Setup Instructions

### Install dependencies
npm install

### Create .env file
PORT=5000  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=your_password  
DB_NAME=content_system  
JWT_SECRET=your_secret_key  

### Run server
npm start

---

## 🔐 Authentication System

JWT-based authentication with Role-Based Access Control (RBAC)

### Roles
TEACHER → Upload content  
PRINCIPAL → Approve / Reject content  
PUBLIC (STUDENTS) → View live content  

---

## 📦 API ENDPOINTS

---

## 🔑 AUTH APIs

### Register User
POST /auth/register

Body:
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456",
  "role": "TEACHER"
}

---

### Login User
POST /auth/login

Response:
{
  "token": "JWT_TOKEN"
}

---

## 👨‍🏫 TEACHER APIs

### Upload Content
POST /content/upload  
Headers: Authorization: Bearer TOKEN  

Body (form-data):
- title
- subject
- file
- startTime
- endTime
- duration

---

### Get My Content
GET /content/my

---

## 👨‍💼 PRINCIPAL APIs

### View Pending Content
GET /content/pending

---

### Approve Content
PUT /content/approve/:id

---

### Reject Content
PUT /content/reject/:id

Body:
{
  "reason": "Invalid content"
}

---

## 🌐 PUBLIC API (STUDENT ACCESS)

### Get Live Content
GET /content/live/:teacherId

No authentication required  
Returns only approved and active scheduled content  

---

## 🔥 CORE FEATURES

- JWT Authentication  
- Role-Based Access Control (RBAC)  
- File Upload System (Multer)  
- Content Approval Workflow  
- Time-Based Scheduling System  
- Subject-Based Content Management  
- Public Broadcasting API  

---

## ⏱️ SCHEDULING LOGIC

Content is shown only when:
- Status is approved  
- Current time is between startTime and endTime  
- Content rotates based on duration per subject  

If no active content:
{
  "message": "No content available"
}

---

## ⚠️ EDGE CASES

- No content available
- Unapproved content hidden
- Invalid teacher ID
- Time mismatch
- Unauthorized access blocked

---

## 🧠 DATABASE DESIGN

Users:
- id, name, email, password_hash, role, created_at

Content:
- id, title, subject, filePath, status, startTime, endTime, duration, uploadedBy, rejectionReason

---

## 🔒 SECURITY FEATURES

- Password hashing (bcrypt)
- JWT authentication
- Role-based authorization
- File validation
- Protected routes

---
### Live Demo
```
grubpac-backend-production.up.railway.app
```
