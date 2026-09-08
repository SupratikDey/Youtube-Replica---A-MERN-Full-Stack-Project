import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Comment from '../components/Comment';
import './VideoPage.css';

function VideoPage() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);
    const { user, isAuthenticated } = useAuth();

    // Fetch video data
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
                setVideo(response.data);
            } catch (error) {
                console.error('Error fetching video:', error);
            }
            setLoading(false);
        };

        fetchVideo();
    }, [id]);

    // Handle like
    const handleLike = async () => {
        if (!isAuthenticated) {
            alert('Please login to like videos');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5000/api/videos/${id}/like`);
            setVideo({
                ...video,
                likes: response.data.likes,
                dislikes: response.data.dislikes
            });
        } catch (error) {
            console.error('Error liking video:', error);
        }
    };

    // Handle dislike
    const handleDislike = async () => {
        if (!isAuthenticated) {
            alert('Please login to dislike videos');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5000/api/videos/${id}/dislike`);
            setVideo({
                ...video,
                likes: response.data.likes,
                dislikes: response.data.dislikes
            });
        } catch (error) {
            console.error('Error disliking video:', error);
        }
    };

    // Add comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert('Please login to comment');
            return;
        }
        if (!newComment.trim()) return;

        setCommentLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/comments', {
                text: newComment,
                videoId: id
            });

            // Add new comment to video's comments
            setVideo({
                ...video,
                comments: [response.data.comment, ...video.comments]
            });
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
        setCommentLoading(false);
    };

    // Delete comment (passed to Comment component)
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
            // Remove comment from state
            setVideo({
                ...video,
                comments: video.comments.filter(c => c._id !== commentId)
            });
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // Update comment (passed to Comment component)
    const handleUpdateComment = async (commentId, newText) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/comments/${commentId}`, {
                text: newText
            });
            // Update comment in state
            setVideo({
                ...video,
                comments: video.comments.map(c => 
                    c._id === commentId ? { ...c, text: response.data.comment.text } : c
                )
            });
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading video...</div>;
    }

    if (!video) {
        return <div className="error">Video not found</div>;
    }

    // Format views
    const formatViews = (views) => {
        if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
        if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
        return views;
    };

    return (
        <div className="video-page">
            <div className="video-page-main">
                {/* Video player */}
                <div className="video-player-wrapper">
                    <video 
                        className="video-player" 
                        controls 
                        src={video.videoUrl}
                        poster={video.thumbnailUrl}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Video info */}
                <div className="video-info-section">
                    <h1 className="video-title">{video.title}</h1>
                    
                    <div className="video-meta">
                        <div className="video-stats">
                            <span>{formatViews(video.views)} views</span>
                            <span>•</span>
                            <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="video-actions">
                            <button className="action-btn like-btn" onClick={handleLike}>
                                👍 {video.likes}
                            </button>
                            <button className="action-btn dislike-btn" onClick={handleDislike}>
                                👎 {video.dislikes}
                            </button>
                        </div>
                    </div>

                    <div className="video-channel-info">
                        <Link to={`/channel/${video.channelId?._id}`} className="channel-link">
                            <div className="channel-name">{video.uploader}</div>
                            <div className="channel-subscribers">
                                {video.channelId?.subscribers || 0} subscribers
                            </div>
                        </Link>
                    </div>

                    <div className="video-description">
                        {video.description}
                    </div>
                </div>

                {/* Comments section */}
                <div className="comments-section">
                    <h3 className="comments-title">
                        Comments ({video.comments?.length || 0})
                    </h3>

                    {/* Add comment form */}
                    {isAuthenticated ? (
                        <form className="comment-form" onSubmit={handleAddComment}>
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="comment-input"
                            />
                            <button 
                                type="submit" 
                                className="comment-submit"
                                disabled={commentLoading || !newComment.trim()}
                            >
                                {commentLoading ? 'Posting...' : 'Comment'}
                            </button>
                        </form>
                    ) : (
                        <p className="comment-login-prompt">
                            <Link to="/login">Sign in</Link> to comment
                        </p>
                    )}

                    {/* Comments list */}
                    <div className="comments-list">
                        {video.comments?.length > 0 ? (
                            video.comments.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    currentUser={user}
                                    onDelete={handleDeleteComment}
                                    onUpdate={handleUpdateComment}
                                />
                            ))
                        ) : (
                            <p className="no-comments">No comments yet. Be the first!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;