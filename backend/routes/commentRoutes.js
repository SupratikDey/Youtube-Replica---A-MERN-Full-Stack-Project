const express = require('express');
const Comment = require('../models/Comment');
const Video = require('../models/Video');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// ADD COMMENT - Only logged in users
router.post('/', authenticate, async (req, res) => {
    try {
        const { text, videoId } = req.body;
        const userId = req.user.userId;
        const username = req.user.username;

        // Check if video exists
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Create comment
        const comment = new Comment({
            userId,
            username,
            text,
            videoId
        });

        await comment.save();

        // Add comment to video's comments array
        video.comments.push(comment._id);
        await video.save();

        // Return the comment with user info
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

// GET COMMENTS FOR A VIDEO
router.get('/video/:videoId', async (req, res) => {
    try {
        const comments = await Comment.find({ 
            videoId: req.params.videoId 
        })
        .sort({ timestamp: -1 }) // Newest first
        .populate('userId', 'username');

        res.json(comments);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE COMMENT - Only comment owner
router.put('/:commentId', authenticate, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user owns this comment
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

// DELETE COMMENT - Only comment owner
router.delete('/:commentId', authenticate, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user owns this comment
        if (comment.userId.toString() !== req.user.userId) {
            return res.status(403).json({ 
                message: 'You don\'t own this comment' 
            });
        }

        // Remove comment from video's comments array
        await Video.findByIdAndUpdate(comment.videoId, {
            $pull: { comments: comment._id }
        });

        // Delete the comment
        await comment.deleteOne();

        res.json({ message: 'Comment deleted!' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;