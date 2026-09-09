import express from 'express';
import Video from '../models/Video.js';
import Channel from '../models/Channel.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET ALL VIDEOS
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find()
            .sort({ uploadDate: -1 })
            .populate('channelId');

        res.json(videos);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET SINGLE VIDEO
router.get('/:videoId', async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId)
            .populate('channelId')
            .populate({
                path: 'comments',
                populate: { path: 'userId', select: 'username' }
            });

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        video.views += 1;
        await video.save();

        res.json(video);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', authenticate, async (req, res) => {
    try {
        const { title, description, thumbnailUrl, videoUrl, category } = req.body;
        const userId = req.user.userId;
        const username = req.user.username;

        const channel = await Channel.findOne({ owner: userId });
        if (!channel) {
            return res.status(400).json({
                message: 'Create a channel first before uploading videos!'
            });
        }

        const video = new Video({
            title,
            description: description || '',
            thumbnailUrl,
            videoUrl,
            channelId: channel._id,
            uploader: username,
            category: category || 'General'
        });

        await video.save();

        channel.videos.push(video._id);
        await channel.save();

        res.status(201).json({
            message: 'Video uploaded successfully!',
            video
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:videoId', authenticate, async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);
        
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const channel = await Channel.findById(video.channelId);
        if (channel.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You don\'t have permission to edit this video'
            });
        }

        const { title, description, category } = req.body;
        if (title) video.title = title;
        if (description) video.description = description;
        if (category) video.category = category;

        await video.save();

        res.json({
            message: 'Video updated successfully!',
            video
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:videoId/like', authenticate, async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        video.likes += 1;
        await video.save();

        res.json({
            message: 'Liked!',
            likes: video.likes,
            dislikes: video.dislikes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DISLIKE VIDEO
router.post('/:videoId/dislike', authenticate, async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        video.dislikes += 1;
        await video.save();

        res.json({
            message: 'Disliked!',
            likes: video.likes,
            dislikes: video.dislikes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// SEARCH VIDEOS
router.get('/search/:query', async (req, res) => {
    try {
        const searchQuery = req.params.query;
        const videos = await Video.find({
            title: { $regex: searchQuery, $options: 'i' }
        }).populate('channelId');

        res.json(videos);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET VIDEOS BY CATEGORY
router.get('/category/:category', async (req, res) => {
    try {
        const videos = await Video.find({
            category: { $regex: req.params.category, $options: 'i' }
        }).populate('channelId');

        res.json(videos);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;