import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${searchQuery}`);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        window.dispatchEvent(new CustomEvent('toggleSidebar', { 
            detail: { open: !sidebarOpen } 
        }));
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <Link to="/" className="logo">
                    <span className="logo-text">YouTube</span>
                </Link>
            </div>

            <form className="header-center" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-btn">🔍</button>
            </form>

            <div className="header-right">
                {isAuthenticated ? (
                    <div className="user-menu">
                        <span className="username">{user?.username}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="signin-btn">
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;