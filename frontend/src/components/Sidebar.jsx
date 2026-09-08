import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleToggle = (event) => {
            setIsOpen(event.detail.open);
        };

        window.addEventListener('toggleSidebar', handleToggle);
        return () => window.removeEventListener('toggleSidebar', handleToggle);
    }, []);

    // Categories for filter buttons
    const categories = [
        'All', 'Music', 'Gaming', 'Sports', 'News', 'Comedy', 
        'Education', 'Technology', 'Travel', 'Food', 'Fashion'
    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-content">
                <ul className="sidebar-menu">
                    <li><Link to="/">🏠 Home</Link></li>
                    <li><Link to="/my-channel">📺 My Channel</Link></li>
                </ul>
                
                <div className="sidebar-categories">
                    <h4>Categories</h4>
                    <ul>
                        {categories.map((cat, index) => (
                            <li key={index}>
                                <Link to={`/?category=${cat}`}>{cat}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;