const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    thumbnailUrl: {
        type: String,
        required: true // URL to the thumbnail image
    },
    videoUrl: {
        type: String,
        required: true // URL to the actual video
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    },
    uploader: {
        type: String, // Store the uploader's name directly
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        default: 'General'
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;