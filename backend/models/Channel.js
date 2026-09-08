const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, // References User collection
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        default: '' // Can be empty initially
    },
    channelBanner: {
        type: String,
        default: '' // URL to banner image
    },
    subscribers: {
        type: Number,
        default: 0
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId, // why not to use string?
        ref: 'Video'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;