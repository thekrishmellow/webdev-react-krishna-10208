import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import QuoteDisplay from './components/QuoteDisplay';
import ActionButtons from './components/ActionButtons';
import Sidebar from './components/Sidebar';

export default function App() {
  
  const [quote, setQuote] = useState({ content: '', author: '', id: '' });
  
  const [loading, setLoading] = useState(true);
  
  const [showLikes, setShowLikes] = useState(false);

  const [likedQuotes, setLikedQuotes] = useState(() => {
    const savedData = localStorage.getItem('likedQuotes');
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });


  const fetchQuote = async () => {
    setLoading(true);

    try {
      const primaryApiUrl = import.meta.env.VITE_QUOTABLE_API_URL;
      const dummyApiKey = import.meta.env.VITE_DUMMY_API_KEY;

      const response = await fetch(primaryApiUrl, {
        headers: {
          'Authorization': `Bearer ${dummyApiKey}`
        }
      });
      
      if (!response.ok) {
         throw new Error('Quotable API failed'); 
      }
      
      const data = await response.json();
      
      setQuote({
        content: data.content,
        author: data.author,
        id: data._id
      });

    } catch (error) {
      try {
        const backupApiUrl = import.meta.env.VITE_API_URL;
        const backupResponse = await fetch(backupApiUrl);
        const backupData = await backupResponse.json();
        
        setQuote({
          content: backupData.quote,
          author: backupData.author,
          id: backupData.id.toString() 
        });
      } catch (backupError) {
        setQuote({
          content: "The future belongs to those who believe in the beauty of their dreams.",
          author: "Eleanor Roosevelt",
          id: "fallback-id-" + Date.now()
        });
      }
    }

    setLoading(false);
  };

  const toggleLike = () => {
    const previouslyLiked = likedQuotes.some((item) => item.id === quote.id);

    if (previouslyLiked) {
      const newList = likedQuotes.filter((item) => item.id !== quote.id);
      setLikedQuotes(newList);
    } else {
      const newList = [quote, ...likedQuotes];
      setLikedQuotes(newList);
    }
  };

  const removeLike = (idToRemove) => {
    const newList = likedQuotes.filter((item) => item.id !== idToRemove);
    setLikedQuotes(newList);
  };



  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    const stringifiedData = JSON.stringify(likedQuotes);
    localStorage.setItem('likedQuotes', stringifiedData);
  }, [likedQuotes]);


  const isLiked = likedQuotes.some((item) => item.id === quote.id);

  return (
    <div className={`dashboard-container ${showLikes ? 'sidebar-open' : ''}`}>
      
      <main className="glass-panel">
        
        <Header 
          likedCount={likedQuotes.length} 
          showLikes={showLikes} 
          setShowLikes={setShowLikes} 
        />
  
        <QuoteDisplay 
          quote={quote} 
          loading={loading} 
        />
        
        <ActionButtons 
          isLiked={isLiked} 
          loading={loading} 
          toggleLike={toggleLike} 
          fetchQuote={fetchQuote} 
        />

      </main>

      <Sidebar 
        showLikes={showLikes} 
        setShowLikes={setShowLikes} 
        likedQuotes={likedQuotes} 
        removeLike={removeLike} 
      />
      
    </div>
  );
}
