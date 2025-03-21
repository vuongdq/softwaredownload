# Software Download Website 🚀

<div align="center">

![Software Download Website](https://raw.githubusercontent.com/vuongdq/softwaredownload/main/screenshot.png)

A modern, full-stack web application for managing and distributing software downloads.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

## ✨ Features

<div align="center">

| Public Interface | Admin Dashboard |
|-----------------|-----------------|
| 🔍 Smart Search & Filtering | 🔐 Secure Authentication |
| 📂 Category-based Navigation | ⚡ Real-time Updates |
| 📱 Responsive Design | 📊 Software Statistics |
| 📥 Download Tracking | 🎯 CRUD Operations |
| 🖼️ Beautiful UI | 📝 Content Management |

</div>

## 🛠️ Technology Stack

<div align="center">

### Backend
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white)

### Frontend
![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![SWR](https://img.shields.io/badge/-SWR-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

## 📦 Project Structure

```
D:\nodejs\software-download-v3\
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   └── softwareController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Category.js
│   │   └── Software.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── softwareRoutes.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── frontend/
    ├── components/
    │   ├── admin/
    │   │   └── AdminDashboard.js
    │   └── public/
    │       └── SoftwareCard.js
    ├── pages/
    │   ├── admin/
    │   │   ├── dashboard.js
    │   │   └── login.js
    │   ├── software/
    │   │   └── [id].js
    │   ├── _app.js
    │   └── index.js
    ├── styles/
    │   └── globals.css
    ├── next.config.js
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- MongoDB 4.4+
- npm or yarn

### Backend Setup

1️⃣ Navigate to backend & install dependencies:
```bash
cd backend
npm install
```

2️⃣ Configure environment:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/software-download
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
UPLOAD_PATH=uploads
FRONTEND_URL=http://localhost:3000
```

3️⃣ Seed database & start server:
```bash
npm run seed
npm run dev
```

### Frontend Setup

1️⃣ Navigate to frontend & install dependencies:
```bash
cd frontend
npm install
```

2️⃣ Start development server:
```bash
npm run dev
```

📌 Access Points:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Admin Access
- 👤 Username: `admin`
- 🔑 Password: `admin123`

## 📝 API Documentation

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/software` | Get all software with pagination and filters |
| GET | `/api/software/:id` | Get software details |
| GET | `/api/categories` | Get all categories |

### Protected Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/software` | Create new software |
| PUT | `/api/software/:id` | Update software |
| DELETE | `/api/software/:id` | Delete software |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

## 🔒 Security Features

- ✅ JWT Authentication
- 🛡️ Protected admin routes
- ✔️ Input validation
- 🚫 Error handling
- 🌐 CORS configuration
- ⚡ Rate limiting (optional)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the Project
2. 🌿 Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the Branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

## ✨ Acknowledgments

- 🤖 Built with assistance from Claude AI (Anthropic)
- 💻 Modern web development best practices
- 🌟 Community-driven open source packages

## 👤 Author

<div align="center">

**Vuong Dong**

[![Email](https://img.shields.io/badge/Email-vuongdongdev%40gmail.com-blue?style=for-the-badge&logo=gmail)](mailto:vuongdongdev@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-blue?style=for-the-badge&logo=github)](https://github.com/vuongdq)

</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
