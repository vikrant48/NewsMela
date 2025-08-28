// Utility functions for content enhancement features

/**
 * Calculate estimated reading time based on word count
 * @param {string} text - The text content to analyze
 * @returns {number} - Estimated reading time in minutes
 */
export const calculateReadTime = (text) => {
  if (!text) return 1;
  
  // Average reading speed is 200-250 words per minute
  const wordsPerMinute = 225;
  const wordCount = text.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, readTime); // Minimum 1 minute
};

/**
 * Get category color based on article source or content
 * @param {string} source - The news source name
 * @param {string} title - The article title
 * @returns {object} - Color scheme object
 */
export const getCategoryColor = (source, title) => {
  const lowerSource = source?.toLowerCase() || '';
  const lowerTitle = title?.toLowerCase() || '';
  
  // Technology
  if (lowerSource.includes('tech') || lowerTitle.includes('tech') || 
      lowerSource.includes('wired') || lowerSource.includes('verge') ||
      lowerTitle.includes('ai') || lowerTitle.includes('software')) {
    return {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-700',
      category: 'Technology'
    };
  }
  
  // Business/Finance
  if (lowerSource.includes('business') || lowerSource.includes('financial') ||
      lowerSource.includes('bloomberg') || lowerSource.includes('reuters') ||
      lowerTitle.includes('market') || lowerTitle.includes('stock') ||
      lowerTitle.includes('economy')) {
    return {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-300',
      border: 'border-green-200 dark:border-green-700',
      category: 'Business'
    };
  }
  
  // Sports
  if (lowerSource.includes('sport') || lowerSource.includes('espn') ||
      lowerTitle.includes('football') || lowerTitle.includes('basketball') ||
      lowerTitle.includes('soccer') || lowerTitle.includes('game')) {
    return {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-800 dark:text-orange-300',
      border: 'border-orange-200 dark:border-orange-700',
      category: 'Sports'
    };
  }
  
  // Health
  if (lowerSource.includes('health') || lowerTitle.includes('health') ||
      lowerTitle.includes('medical') || lowerTitle.includes('covid')) {
    return {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-800 dark:text-red-300',
      border: 'border-red-200 dark:border-red-700',
      category: 'Health'
    };
  }
  
  // Entertainment
  if (lowerSource.includes('entertainment') || lowerSource.includes('hollywood') ||
      lowerTitle.includes('movie') || lowerTitle.includes('celebrity') ||
      lowerTitle.includes('music')) {
    return {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-800 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-700',
      category: 'Entertainment'
    };
  }
  
  // Default - General News
  return {
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-800 dark:text-gray-300',
    border: 'border-gray-200 dark:border-gray-600',
    category: 'General'
  };
};

/**
 * Generate social sharing URLs
 * @param {string} url - Article URL
 * @param {string} title - Article title
 * @param {string} description - Article description
 * @returns {object} - Social sharing URLs
 */
export const getSocialShareUrls = (url, title, description) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedDescription}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
  };
};

/**
 * Get publication source logo/icon
 * @param {string} sourceName - The name of the news source
 * @returns {string} - Icon class or emoji
 */
export const getSourceIcon = (sourceName) => {
  if (!sourceName) return '📰';
  
  const lowerSource = sourceName.toLowerCase();
  
  // Major news sources with recognizable icons
  const sourceIcons = {
    'bbc': '🇬🇧',
    'cnn': '📺',
    'reuters': '📊',
    'bloomberg': '💼',
    'techcrunch': '💻',
    'the verge': '🔧',
    'wired': '⚡',
    'espn': '⚽',
    'fox news': '🦊',
    'nbc news': '📡',
    'abc news': '📺',
    'washington post': '📰',
    'new york times': '📰',
    'guardian': '🇬🇧',
    'associated press': '📰',
    'usa today': '🇺🇸'
  };
  
  // Check for exact matches first
  for (const [source, icon] of Object.entries(sourceIcons)) {
    if (lowerSource.includes(source)) {
      return icon;
    }
  }
  
  // Default icon
  return '📰';
};

/**
 * Format bookmark data for local storage
 * @param {object} article - Article object
 * @returns {object} - Formatted bookmark data
 */
export const formatBookmarkData = (article) => {
  return {
    id: article.url || `${article.title}-${Date.now()}`,
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    source: article.source,
    publishedAt: article.publishedAt,
    bookmarkedAt: new Date().toISOString()
  };
};

/**
 * Manage bookmarks in local storage
 */
export const bookmarkManager = {
  getBookmarks: () => {
    try {
      const bookmarks = localStorage.getItem('newsBookmarks');
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  },
  
  addBookmark: (article) => {
    try {
      const bookmarks = bookmarkManager.getBookmarks();
      const bookmarkData = formatBookmarkData(article);
      
      // Check if already bookmarked
      if (!bookmarks.find(b => b.id === bookmarkData.id)) {
        bookmarks.unshift(bookmarkData);
        localStorage.setItem('newsBookmarks', JSON.stringify(bookmarks));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      return false;
    }
  },
  
  removeBookmark: (articleId) => {
    try {
      const bookmarks = bookmarkManager.getBookmarks();
      const filteredBookmarks = bookmarks.filter(b => b.id !== articleId);
      localStorage.setItem('newsBookmarks', JSON.stringify(filteredBookmarks));
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }
  },
  
  isBookmarked: (articleId) => {
    const bookmarks = bookmarkManager.getBookmarks();
    return bookmarks.some(b => b.id === articleId);
  }
};