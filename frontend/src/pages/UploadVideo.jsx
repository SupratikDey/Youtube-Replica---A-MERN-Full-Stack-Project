import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UploadVideo.css';

function UploadVideo() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnailUrl: '',
        videoUrl: '',
        category: 'General'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await axios.post('http://localhost:5000/api/videos', formData);
            // Send the user back to their channel so they see the new video.
            navigate('/my-channel');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload video');
        }
        setLoading(false);
    };

    return (
        <div className="upload-video-page">
            <div className="upload-video-container">
                <h2>Upload a Video</h2>

                <form onSubmit={handleSubmit} className="upload-video-form">
                    {error && <div className="form-error">{error}</div>}

                    <div className="form-group">
                        <label>Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Video title"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell viewers about your video"
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>Thumbnail URL *</label>
                        <input
                            type="url"
                            name="thumbnailUrl"
                            value={formData.thumbnailUrl}
                            onChange={handleChange}
                            required
                            placeholder="https://example.com/thumbnail.jpg"
                        />
                    </div>

                    <div className="form-group">
                        <label>Video URL *</label>
                        <input
                            type="url"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            required
                            placeholder="https://example.com/video.mp4"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Music, Gaming"
                        />
                    </div>

                    <button type="submit" className="upload-submit-btn" disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UploadVideo;