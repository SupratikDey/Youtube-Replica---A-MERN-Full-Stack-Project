import express from 'express';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ADD COMMENT
router.post('/', authenticate, async (req, res) => {
    try {
        const { text, videoId } = req.body;
        const userId = req.user.userId;
        const username = req.user.username;

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const comment = new Comment({
            userId,
            username,
            text,
            videoId
        });

        await comment.save();

        video.comments.push(comment._id);
        await video.save();

        const populatedComment = await Comment.findById(comment._id)
            .populate('userId', 'username');

        res.status(201).json({
            message: 'Comment added!',
            comment: populatedComment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET COMMENTS FOR VIDEO
router.get('/video/:videoId', async (req, res) => {
    try {
        const comments = await Comment.find({
            videoId: req.params.videoId
        })
        .sort({ timestamp: -1 })
        .populate('userId', 'username');

        res.json(comments);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE COMMENT
router.put('/:commentId', authenticate, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You don\'t own this comment'
            });
        }

        comment.text = req.body.text;
        await comment.save();

        res.json({
            message: 'Comment updated!',
            comment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE COMMENT
router.delete('/:commentId', authenticate, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You don\'t own this comment'
            });
        }

        await Video.findByIdAndUpdate(comment.videoId, {
            $pull: { comments: comment._id }
        });

        await comment.deleteOne();

        res.json({ message: 'Comment deleted!' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;