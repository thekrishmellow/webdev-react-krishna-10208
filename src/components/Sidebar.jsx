import React from 'react';
import { Heart, X } from 'lucide-react';

export default function Sidebar({ showLikes, setShowLikes, likedQuotes, removeLike }) {

  if (!showLikes) {
    return null;
  }

  return (
    <aside className="sidebar glass-panel">
      
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <Heart size={20} fill="var(--primary)" color="var(--primary)" />
          Your Inspirations
        </h2>

        <button 
          className="btn-remove" 
          onClick={() => setShowLikes(false)}
          style={{ padding: 0 }}
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="liked-list">
        
        {likedQuotes.length === 0 ? (
          
          <div className="empty-state">
            No liked quotes yet. Find some inspiration!
          </div>

        ) : (
          
          likedQuotes.map((item) => (
            
            <div key={item.id} className="liked-item">
              
              <div className="liked-item-content">"{item.content}"</div>
              
              <div className="liked-item-footer">
                <span className="liked-item-author">— {item.author}</span>
                
                <button 
                  className="btn-remove" 
                  onClick={() => removeLike(item.id)}
                  title="Remove from likes"
                >
                  <X size={16} />
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
