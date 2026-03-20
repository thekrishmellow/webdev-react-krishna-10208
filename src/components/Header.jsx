import React from 'react';
import { Sparkles, Heart } from 'lucide-react'; // Importing icons

export default function Header({ likedCount, showLikes, setShowLikes }) {
  return (
    <header className="header">
      
      <div className="title-group">
        <Sparkles className="title-icon" size={24} />
        <h1 className="title">Daily Motivation</h1>
      </div>
      
      <button 
        className="likes-toggle" 
        onClick={() => setShowLikes(!showLikes)} 
        title="Toggle Liked Quotes"
      >
        <Heart size={18} fill="currentColor" />
        
        <span>{likedCount}</span> 
      </button>

    </header>
  );
}
