import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import Sidebar from '../components/Sidebar';
import './Home.css';

function Home() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const location = useLocation();

    // Get search query or category from URL
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');
    const categoryQuery = queryParams.get('category');

    // Categories for filter buttons
    const categories = [
        'All', 'Music', 'Gaming', 'Sports', 'News', 'Comedy', 
        'Education', 'Technology', 'Travel', 'Food', 'Fashion'
    ];

    // Fetch videos based on search/category
    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:5000/api/videos';
                
                if (searchQuery) {
                    url = `http://localhost:5000/api/videos/search/${searchQuery}`;
                } else if (categoryQuery && categoryQuery !== 'All') {
                    url = `http://localhost:5000/api/videos/category/${categoryQuery}`;
                }
                
                const response = await axios.get(url);
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setVideos([]);
            }
            setLoading(false);
        };

        fetchVideos();
    }, [searchQuery, categoryQuery]);

    useEffect(() => {
        if (categoryQuery) {
            setSelectedCategory(categoryQuery);
        } else {
            setSelectedCategory('All');
        }
    }, [categoryQuery]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        window.history.pushState({}, '', `/?category=${category}`);
        window.dispatchEvent(new Event('popstate'));
    };

    if (loading) {
        return <div className="loading">Loading videos...</div>;
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="home-main">
                <div className="filter-bar">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Video grid */}
                <div className="video-grid">
                    {videos.length > 0 ? (
                        videos.map((video) => (
                            <VideoCard key={video._id} video={video} />
                        ))
                    ) : (
                        <div className="no-videos">
                            {searchQuery ? (
                                <p>No videos found for "{searchQuery}"</p>
                            ) : (
                                <p>No videos available. Be the first to upload!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;