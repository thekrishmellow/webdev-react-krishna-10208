import React from 'react';
import { Quote, Loader2 } from 'lucide-react';

export default function QuoteDisplay({ quote, loading }) {
  return (
    <div className="quote-container">
      
      <Quote className="quote-icon-large" />
      
      
      {loading ? (
        
        <div className="loading-state">
          
          <Loader2 className="spin" size={48} />
          <p>Summoning inspiration...</p>
        </div>

      ) : (
        
        <div className="quote-content">
          <h2 className="quote-text">"{quote.content}"</h2>
          <div className="quote-author">{quote.author}</div>
        </div>

      )}
      
    </div>
  );
}
