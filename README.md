Yes — I misunderstood your request. You wanted me to **rephrase the entire README using the content from the `.md` file you uploaded**, not just rewrite the database section.

I’ll keep the **same information, features, setup steps, project structure, API endpoints, database instructions, credentials, scripts, etc.**, but make the wording more natural, concise, and suitable for an actual student capstone project README. I’ll also avoid unnecessary claims or overly professional wording. The original document contains all of these sections and details. 

Here is the rewritten version:

````markdown
# 🎬 YouTube Clone – MERN Stack

A YouTube-inspired web application built using the MERN stack (MongoDB, Express.js, React, and Node.js).

The application allows users to register and log in, browse and search videos, create channels, upload videos, interact with videos through likes and dislikes, and manage comments.

---

## ✨ Features

### Frontend

- User registration and login using JWT authentication
- YouTube-style homepage with header, sidebar, and video grid
- Search videos by title
- Filter videos by category
- Video player page with like/dislike functionality
- Channel creation and management
- Upload, edit, and delete videos
- Add, edit, and delete comments
- Toggleable sidebar navigation
- Responsive design for different screen sizes

### Backend

- RESTful API architecture
- JWT-based authentication
- MongoDB database using Mongoose
- CRUD operations for videos and comments
- Video search and category filtering
- Authentication middleware for protected routes
- Error handling for API requests

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React | User interface |
| React Router DOM | Page navigation |
| Axios | API requests |
| Vite | Development and build tool |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB object modelling |
| JSON Web Token | User authentication |
| bcryptjs | Password hashing |
| CORS | Cross-origin requests |
| dotenv | Environment variables |

---

## 📂 Project Structure

```text
youtube-clone/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Channel.js
│   │   ├── Video.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── channelRoutes.js
│   │   ├── videoRoutes.js
│   │   └── commentRoutes.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Sidebar.css
│   │   │   ├── VideoCard.jsx
│   │   │   ├── VideoCard.css
│   │   │   ├── Comment.jsx
│   │   │   └── Comment.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Auth.css
│   │   │   ├── VideoPage.jsx
│   │   │   ├── VideoPage.css
│   │   │   ├── ChannelPage.jsx
│   │   │   ├── ChannelPage.css
│   │   │   ├── UploadVideo.jsx
│   │   │   └── UploadVideo.css
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── database-seed/
│   ├── users.json
│   ├── channels.json
│   ├── videos.json
│   └── comments.json
│
├── DATABASE_SETUP.md
├── README.md
└── .gitignore
````

---

## 📋 Prerequisites

Before running the project, make sure you have:

* Node.js installed
* npm installed
* MongoDB installed and running locally
* MongoDB Compass (recommended)
* Git

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/youtube-clone.git
cd youtube-clone
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Create the `.env` File

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/youtube_clone
JWT_SECRET=your_secret_key
```

> Do not commit your `.env` file to GitHub.

### 4. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## 🗄️ Database Setup

This project uses MongoDB locally.

The repository includes exported database files in the `database-seed` folder so that the database can be recreated and tested locally.

```text
database-seed/
├── users.json
├── channels.json
├── videos.json
└── comments.json
```

### Using MongoDB Compass

1. Open MongoDB Compass.
2. Connect to:

```text
mongodb://localhost:27017
```

3. Create a database named:

```text
youtube_clone
```

4. Open the `youtube_clone` database.
5. For each JSON file, select **Add Data → Import File**.
6. Import the files into the corresponding collections:

| File            | Collection |
| --------------- | ---------- |
| `users.json`    | `users`    |
| `channels.json` | `channels` |
| `videos.json`   | `videos`   |
| `comments.json` | `comments` |

The `database-seed` files allow evaluators to recreate the sample database without requiring access to the original local MongoDB database. 

---

## 🚀 Running the Application

### Start the Backend

```bash
cd backend
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Vite will provide the frontend URL, normally:

```text
http://localhost:5173
```

Open the frontend URL in your browser to use the application.

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description         | Authentication |
| ------ | -------------------- | ------------------- | -------------- |
| POST   | `/api/auth/register` | Register a new user | ❌              |
| POST   | `/api/auth/login`    | Login a user        | ❌              |
| GET    | `/api/auth/me`       | Get current user    | ✅              |

### Channels

| Method | Endpoint                                   | Description        | Authentication |
| ------ | ------------------------------------------ | ------------------ | -------------- |
| POST   | `/api/channels`                            | Create a channel   | ✅              |
| GET    | `/api/channels/my-channel`                 | Get user's channel | ✅              |
| GET    | `/api/channels/:channelId`                 | Get a channel      | ❌              |
| DELETE | `/api/channels/:channelId/videos/:videoId` | Delete a video     | ✅              |

### Videos

| Method | Endpoint                         | Description        | Authentication |
| ------ | -------------------------------- | ------------------ | -------------- |
| GET    | `/api/videos`                    | Get all videos     | ❌              |
| GET    | `/api/videos/:videoId`           | Get a video        | ❌              |
| POST   | `/api/videos`                    | Upload a video     | ✅              |
| PUT    | `/api/videos/:videoId`           | Update a video     | ✅              |
| POST   | `/api/videos/:videoId/like`      | Like a video       | ✅              |
| POST   | `/api/videos/:videoId/dislike`   | Dislike a video    | ✅              |
| GET    | `/api/videos/search/:query`      | Search videos      | ❌              |
| GET    | `/api/videos/category/:category` | Filter by category | ❌              |

### Comments

| Method | Endpoint                       | Description        | Authentication |
| ------ | ------------------------------ | ------------------ | -------------- |
| POST   | `/api/comments`                | Add a comment      | ✅              |
| GET    | `/api/comments/video/:videoId` | Get video comments | ❌              |
| PUT    | `/api/comments/:commentId`     | Update a comment   | ✅              |
| DELETE | `/api/comments/:commentId`     | Delete a comment   | ✅              |

---

## 👤 Test Account

After importing the database, you can use the following account to test the application:

| Username   | Password      | Email              |
| ---------- | ------------- | ------------------ |
| `john_doe` | `password123` | `john@example.com` |

You can also create a new account through the registration page.

---

## 🎬 Video Demo

A video demonstration of the project can be added here:

```text
[Video Demo Link]
```

The demonstration can cover:

* User registration and login
* Backend API testing
* Channel creation
* Video upload
* Search and filtering
* Like/dislike functionality
* Comment operations
* Responsive design

---

## 🔐 Environment Variables

The backend requires the following environment variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/youtube_clone
JWT_SECRET=your_secret_key
```

The `.env` file should remain private and should not be uploaded to GitHub.

---

## 🐛 Troubleshooting

### MongoDB Connection Error

Make sure MongoDB is running and that the connection string is correct.

```text
mongodb://localhost:27017
```

### Port Already in Use

If port `5000` is already being used, change the `PORT` value in `.env`.

### Missing Dependencies

Run:

```bash
npm install
```

inside both the `backend` and `frontend` folders.

### Authentication Error

Make sure the JWT token is being sent correctly in the `Authorization` header.

---

## 📜 Available Scripts

### Backend

Run these commands from the `backend` folder:

| Command        | Description                        |
| -------------- | ---------------------------------- |
| `npm start`    | Start the backend server           |
| `npm run dev`  | Start the server with auto-reload  |
| `npm run seed` | Seed the database with sample data |

### Frontend

Run these commands from the `frontend` folder:

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Create a production build    |
| `npm run preview` | Preview the production build |


##  Technologies Used

This project was built using:

* React
* Node.js
* Express.js
* MongoDB
* Mongoose
* Vite
* JWT
* bcryptjs
* Axios

---

## 🔗 Project Links

**GitHub Repository:**
Add your GitHub repository link here.

**Video Demo:**
(https://drive.google.com/file/d/1NUb8oeT81VUy-s6qgePN9K5QPfLQjgZQ/view?usp=sharing)

---

## ⭐ Project Overview

This project demonstrates a full-stack MERN application with user authentication, REST APIs, MongoDB integration, video management, channels, likes/dislikes, search, filtering, and comments.
