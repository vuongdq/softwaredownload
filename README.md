# Software Download Website

A modern, full-stack web application for managing and distributing software downloads. Built with Node.js, Express, MongoDB, and Next.js.

## 🌟 Features

- **Public Interface**:
  - Browse software by categories
  - Search functionality with real-time filtering
  - Detailed software information pages
  - Responsive design for all devices
  - Download tracking system

- **Admin Dashboard**:
  - Secure authentication system
  - CRUD operations for software and categories
  - Software statistics and analytics
  - User-friendly interface for content management
  - Real-time updates

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Morgan for logging
- CORS enabled
- Error handling middleware

### Frontend
- Next.js 13
- React with Hooks
- SWR for data fetching
- Tailwind CSS
- React Hot Toast for notifications
- Responsive design
- Hero Icons

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

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/software-download
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
UPLOAD_PATH=uploads
FRONTEND_URL=http://localhost:3000
```

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Default Admin Credentials
- Username: admin
- Password: admin123

## 📝 API Documentation

### Public Endpoints
- `GET /api/software` - Get all software with pagination and filters
- `GET /api/software/:id` - Get software details
- `GET /api/categories` - Get all categories

### Protected Endpoints (requires authentication)
- `POST /api/software` - Create new software
- `PUT /api/software/:id` - Update software
- `DELETE /api/software/:id` - Delete software
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 🔒 Security Features
- JWT Authentication
- Protected admin routes
- Input validation
- Error handling
- CORS configuration
- Rate limiting (optional)

## 🤝 Contributing
Feel free to contribute to this project. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ✨ Acknowledgments
- Built with assistance from Claude AI (Anthropic)
- Modern web development best practices
- Community-driven open source packages

## 👤 Author
**Vuong Dong**
- Email: vuongdongdev@gmail.com
- GitHub: [Your GitHub Profile]

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details. 