import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';

function VideoCard({ video }) {
    // Format view count (e.g., 15200 -> 15.2K)
    const formatViews = (views) => {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M';
        }
        if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        }
        return views;
    };

    // Format date
    const formatDate = (date) => {
        const now = new Date();
        const uploadDate = new Date(date);
        const diffTime = Math.abs(now - uploadDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    return (
        <Link to={`/video/${video._id}`} className="video-card">
            <div className="video-thumbnail">
                <img src={video.thumbnailUrl} alt={video.title} />
            </div>
            <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-channel">{video.uploader}</p>
                <div className="video-stats">
                    <span>{formatViews(video.views)} views</span>
                    <span>•</span>
                    <span>{formatDate(video.uploadDate)}</span>
                </div>
            </div>
        </Link>
    );
}

export default VideoCard;