// Importing required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const channelRoutes = require('./routes/channelRoutes');
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

app.use((req, res, next) => {
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    res.on("finish", () => {
        console.log(`Status Code: ${res.statusCode}`);
    });
    next();
});

// Default route to check if server is running
app.get("/", (req, res) => {
    res.send("It is running!");
});

app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

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