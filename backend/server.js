import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

process.on('uncaughtException', (err) => {
    console.log('uncaught error:', err);
    console.log('Stack trace:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('🚨 UNHANDLED REJECTION:', reason);
    console.log('Stack trace:', reason.stack);
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    res.on("finish", () => {
        console.log(`Status Code: ${res.statusCode}`);
    });
    next();
});

// Default route
app.get("/", (req, res) => {
    res.send("YouTube Clone API is running!");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/youtube_clone')
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running successfully on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.log('MongoDB connection error:', err);
    });