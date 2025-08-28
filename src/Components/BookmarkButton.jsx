import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bookmarkManager } from './utils/contentUtils';

const BookmarkButton = ({ article, className = '' }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const articleId = article.url || `${article.title}-${Date.now()}`;
  
  useEffect(() => {
    setIsBookmarked(bookmarkManager.isBookmarked(articleId));
  }, [articleId]);
  
  const handleBookmarkToggle = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    if (isBookmarked) {
      const success = bookmarkManager.removeBookmark(articleId);
      if (success) {
        setIsBookmarked(false);
      }
    } else {
      const success = bookmarkManager.addBookmark(article);
      if (success) {
        setIsBookmarked(true);
      }
    }
  };
  
  return (
    <button
      onClick={handleBookmarkToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleBookmarkToggle(e)
        }
      }}
      className={`group relative flex items-center justify-center p-2 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus-enhanced bookmark-btn ${className} ${
        isAnimating ? 'scale-110' : 'scale-100'
      }`}
      aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      {/* Bookmark Icon */}
      <svg 
        className={`w-5 h-5 transition-all duration-200 ${
          isBookmarked 
            ? 'text-yellow-500 fill-current' 
            : 'text-gray-400 dark:text-gray-500 group-hover:text-yellow-500'
        }`} 
        fill={isBookmarked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={isBookmarked ? 0 : 2} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
      </div>
      
      {/* Animation Effect */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-30 animate-ping"></div>
      )}
    </button>
  );
};

BookmarkButton.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    source: PropTypes.object,
    publishedAt: PropTypes.string
  }).isRequired,
  className: PropTypes.string
};

export default BookmarkButton;