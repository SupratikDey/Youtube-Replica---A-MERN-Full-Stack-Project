import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import VideoCard from '../components/VideoCard';
import './ChannelPage.css';

function ChannelPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token, isAuthenticated } = useAuth();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    
    // Form states for creating/editing channel
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        channelName: '',
        description: '',
        channelBanner: ''
    });
    const [formError, setFormError] = useState('');
    const [formLoading, setFormLoading] = useState(false);

    // Edit video states
    const [editingVideo, setEditingVideo] = useState(null);
    const [editVideoData, setEditVideoData] = useState({
        title: '',
        description: '',
        category: ''
    });

    // Fetch channel data
    useEffect(() => {
        const fetchChannel = async () => {
            setLoading(true);
            try {
                let channelData;
                let videosData;

                // If no ID provided, fetch user's own channel
                if (!id) {
                    if (!isAuthenticated) {
                        navigate('/login');
                        return;
                    }
                    const response = await axios.get('http://localhost:5000/api/channels/my-channel');
                    channelData = response.data;
                    videosData = channelData.videos || [];
                } else {
                    // Fetch channel by ID
                    const response = await axios.get(`http://localhost:5000/api/channels/${id}`);
                    channelData = response.data;
                    videosData = channelData.videos || [];
                }

                setChannel(channelData);
                setVideos(videosData);
                
                // Check if current user owns this channel
                if (user && channelData.owner?._id === user.id) {
                    setIsOwner(true);
                }

            } catch (error) {
                console.error('Error fetching channel:', error);
                if (error.response?.status === 404) {
                    setChannel(null);
                }
            }
            setLoading(false);
        };

        fetchChannel();
    }, [id, isAuthenticated, user]);

    // Create channel
    const handleCreateChannel = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');

        try {
            const response = await axios.post('http://localhost:5000/api/channels', formData);
            setChannel(response.data.channel);
            setShowCreateForm(false);
            setFormData({ channelName: '', description: '', channelBanner: '' });
            setIsOwner(true);
        } catch (error) {
            setFormError(error.response?.data?.message || 'Failed to create channel');
        }
        setFormLoading(false);
    };

    // Delete video
    const handleDeleteVideo = async (videoId) => {
        if (!window.confirm('Are you sure you want to delete this video?')) return;
        
        try {
            await axios.delete(`http://localhost:5000/api/channels/${channel._id}/videos/${videoId}`);
            setVideos(videos.filter(v => v._id !== videoId));
        } catch (error) {
            console.error('Error deleting video:', error);
            alert('Failed to delete video');
        }
    };

    // Edit video
    const handleEditVideo = async (videoId) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/videos/${videoId}`, editVideoData);
            // Update video in list
            setVideos(videos.map(v => 
                v._id === videoId ? { ...v, ...editVideoData } : v
            ));
            setEditingVideo(null);
            setEditVideoData({ title: '', description: '', category: '' });
        } catch (error) {
            console.error('Error updating video:', error);
            alert('Failed to update video');
        }
    };

    if (loading) {
        return <div className="loading">Loading channel...</div>;
    }

    // If no channel and user is authenticated, show create channel form
    if (!channel && isAuthenticated) {
        return (
            <div className="channel-page create-channel-page">
                <div className="create-channel-container">
                    <h2>Create Your Channel</h2>
                    <p>Start uploading videos by creating your channel</p>
                    
                    <form onSubmit={handleCreateChannel} className="create-channel-form">
                        {formError && <div className="form-error">{formError}</div>}
                        
                        <div className="form-group">
                            <label>Channel Name *</label>
                            <input
                                type="text"
                                value={formData.channelName}
                                onChange={(e) => setFormData({...formData, channelName: e.target.value})}
                                required
                                placeholder="Enter channel name"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Tell viewers about your channel"
                                rows="3"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Channel Banner URL</label>
                            <input
                                type="url"
                                value={formData.channelBanner}
                                onChange={(e) => setFormData({...formData, channelBanner: e.target.value})}
                                placeholder="https://example.com/banner.png"
                            />
                        </div>
                        
                        <button type="submit" className="create-channel-btn" disabled={formLoading}>
                            {formLoading ? 'Creating...' : 'Create Channel'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (!channel) {
        return (
            <div className="channel-page">
                <div className="channel-not-found">
                    <h2>Channel not found</h2>
                    <p>The channel you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="channel-page">
            <div className="channel-header">
                {channel.channelBanner && (
                    <div className="channel-banner">
                        <img src={channel.channelBanner} alt="Channel banner" />
                    </div>
                )}
                <div className="channel-info">
                    <h1 className="channel-name">{channel.channelName}</h1>
                    <p className="channel-description">{channel.description || 'No description'}</p>
                    <div className="channel-stats">
                        <span>{channel.subscribers || 0} subscribers</span>
                        <span>•</span>
                        <span>{videos.length} videos</span>
                    </div>
                </div>
            </div>

            <div className="channel-content">
                <div className="channel-videos-section">
                    <div className="section-header">
                        <h2>Videos</h2>
                        {isOwner && (
                            <button className="upload-btn" onClick={() => navigate('/upload')}>
                                + Upload Video
                            </button>
                        )}
                    </div>

                    {videos.length > 0 ? (
                        <div className="video-grid">
                            {videos.map((video) => (
                                <div key={video._id} className="video-item">
                                    <VideoCard video={video} />
                                    {isOwner && (
                                        <div className="video-actions">
                                            <button 
                                                className="video-action-btn edit"
                                                onClick={() => {
                                                    setEditingVideo(video._id);
                                                    setEditVideoData({
                                                        title: video.title,
                                                        description: video.description || '',
                                                        category: video.category || 'General'
                                                    });
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="video-action-btn delete"
                                                onClick={() => handleDeleteVideo(video._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                    
                                    {/* Edit form for this video */}
                                    {editingVideo === video._id && isOwner && (
                                        <div className="edit-video-form">
                                            <h4>Edit Video</h4>
                                            <div className="form-group">
                                                <label>Title</label>
                                                <input
                                                    type="text"
                                                    value={editVideoData.title}
                                                    onChange={(e) => setEditVideoData({
                                                        ...editVideoData,
                                                        title: e.target.value
                                                    })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea
                                                    value={editVideoData.description}
                                                    onChange={(e) => setEditVideoData({
                                                        ...editVideoData,
                                                        description: e.target.value
                                                    })}
                                                    rows="2"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Category</label>
                                                <input
                                                    type="text"
                                                    value={editVideoData.category}
                                                    onChange={(e) => setEditVideoData({
                                                        ...editVideoData,
                                                        category: e.target.value
                                                    })}
                                                    placeholder="e.g., Music, Gaming"
                                                />
                                            </div>
                                            <div className="edit-video-actions">
                                                <button 
                                                    className="save-btn"
                                                    onClick={() => handleEditVideo(video._id)}
                                                >
                                                    Save
                                                </button>
                                                <button 
                                                    className="cancel-btn"
                                                    onClick={() => {
                                                        setEditingVideo(null);
                                                        setEditVideoData({ title: '', description: '', category: '' });
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-videos">
                            <p>No videos uploaded yet</p>
                            {isOwner && (
                                <button className="upload-btn" onClick={() => navigate('/upload')}>
                                    Upload your first video
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChannelPage;