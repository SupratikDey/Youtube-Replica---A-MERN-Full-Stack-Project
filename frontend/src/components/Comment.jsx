import React, { useState } from 'react';
import './Comment.css';

function Comment({ comment, currentUser, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);
    const [showActions, setShowActions] = useState(false);

    const isOwner = currentUser && currentUser.id === comment.userId?._id;

    const handleEdit = () => {
        if (editText.trim()) {
            onUpdate(comment._id, editText);
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            onDelete(comment._id);
        }
    };

    // Format date
    const formatDate = (date) => {
        const now = new Date();
        const commentDate = new Date(date);
        const diffTime = Math.abs(now - commentDate);
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <div 
            className="comment"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="comment-avatar">
                {comment.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="comment-content">
                <div className="comment-header">
                    <span className="comment-username">{comment.username || 'Unknown'}</span>
                    <span className="comment-time">{formatDate(comment.timestamp)}</span>
                </div>

                {isEditing ? (
                    <div className="comment-edit">
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="comment-edit-input"
                            autoFocus
                        />
                        <div className="comment-edit-actions">
                            <button onClick={handleEdit} className="edit-save">Save</button>
                            <button 
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditText(comment.text);
                                }} 
                                className="edit-cancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="comment-text">{comment.text}</p>
                )}

                {isOwner && !isEditing && (
                    <div className={`comment-actions ${showActions ? 'visible' : ''}`}>
                        <button onClick={() => setIsEditing(true)} className="comment-action-btn">
                            ✏️ Edit
                        </button>
                        <button onClick={handleDelete} className="comment-action-btn delete">
                            🗑️ Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;