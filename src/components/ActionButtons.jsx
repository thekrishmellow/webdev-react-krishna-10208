import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export default function ActionButtons({ isLiked, loading, toggleLike, fetchQuote }) {
  return (
    <div className="actions">
      
      <button 
        className={isLiked ? "btn btn-like liked" : "btn btn-like"}
        onClick={toggleLike}
        disabled={loading}
      >
        <Heart 
          className={isLiked ? "heart-icon filled" : "heart-icon"} 
          size={20} 
        />

        {isLiked ? 'Loved' : 'Like'}
      </button>
      
     
      <button 
        className="btn btn-primary"
        onClick={fetchQuote}
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'New Quote'}
        {!loading && <ArrowRight size={20} />}
        
      </button>

    </div>
  );
}
