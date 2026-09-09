import express from 'express';
import Channel from '../models/Channel.js';
import Video from '../models/Video.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// CREATE CHANNEL
router.post('/', authenticate, async (req, res) => {
    try {
        const { channelName, description, channelBanner } = req.body;
        const userId = req.user.userId;

        const existingChannel = await Channel.findOne({ owner: userId });
        if (existingChannel) {
            return res.status(400).json({
                message: 'You already have a channel!'
            });
        }

        const nameTaken = await Channel.findOne({ channelName });
        if (nameTaken) {
            return res.status(400).json({
                message: 'Channel name already taken'
            });
        }

        const channel = new Channel({
            channelName,
            owner: userId,
            description: description || '',
            channelBanner: channelBanner || ''
        });

        await channel.save();

        res.status(201).json({
            message: 'Channel created successfully!',
            channel
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET CHANNEL BY ID
router.get('/:channelId', async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.channelId)
            .populate('videos');

        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        res.json(channel);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET USER'S CHANNEL
router.get('/my-channel', authenticate, async (req, res) => {
    try {
        const channel = await Channel.findOne({ owner: req.user.userId })
            .populate('videos');

        if (!channel) {
            return res.status(404).json({ message: 'You don\'t have a channel yet' });
        }

        res.json(channel);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE VIDEO FROM CHANNEL
router.delete('/:channelId/videos/:videoId', authenticate, async (req, res) => {
    try {
        const channel = await Channel.findOne({
            _id: req.params.channelId,
            owner: req.user.userId
        });

        if (!channel) {
            return res.status(404).json({
                message: 'Channel not found or you don\'t own it'
            });
        }

        channel.videos = channel.videos.filter(
            videoId => videoId.toString() !== req.params.videoId
        );
        await channel.save();

        await Video.findByIdAndDelete(req.params.videoId);

        res.json({ message: 'Video deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;