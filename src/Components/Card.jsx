
import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { calculateReadTime, getCategoryColor, getSourceIcon } from './utils/contentUtils'
import SocialShare from './SocialShare'
import BookmarkButton from './BookmarkButton'

// LazyImage component with WebP optimization and Intersection Observer
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [optimizedSrc, setOptimizedSrc] = useState('')
  const imgRef = useRef()

  // Function to optimize image URL for better performance
  const optimizeImageUrl = (originalSrc) => {
    if (!originalSrc) return ''
    
    // For external images, try to add optimization parameters
    try {
      const url = new URL(originalSrc)
      
      // Add size optimization parameters for common image services
      if (url.hostname.includes('unsplash.com')) {
        url.searchParams.set('w', '400')
        url.searchParams.set('h', '300')
        url.searchParams.set('fit', 'crop')
        url.searchParams.set('fm', 'webp')
        url.searchParams.set('q', '80')
      } else if (url.hostname.includes('images.unsplash.com')) {
        url.searchParams.set('w', '400')
        url.searchParams.set('h', '300')
        url.searchParams.set('fit', 'crop')
        url.searchParams.set('fm', 'webp')
        url.searchParams.set('q', '80')
      }
      
      return url.toString()
    } catch {
      return originalSrc
    }
  }

  useEffect(() => {
    setOptimizedSrc(optimizeImageUrl(src))
  }, [src])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    // Try fallback to original src if optimized version fails
    if (optimizedSrc !== src && src) {
      setOptimizedSrc(src)
      setHasError(false)
    } else {
      setHasError(true)
      setIsLoaded(true)
    }
  }

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {!isInView ? (
        // Placeholder while not in view
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-500">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
          {hasError ? (
            <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center" role="img" aria-label={`Image not available for article: ${alt}`}>
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Image not available</p>
              </div>
            </div>
          ) : (
            <picture>
              <source srcSet={optimizedSrc} type="image/webp" />
              <img
                src={optimizedSrc || src}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                loading="lazy"
                decoding="async"
                width="400"
                height="300"
              />
            </picture>
          )}
        </>
      )}
    </div>
  )
}

const Card = ({ data }) => {
  // Handle loading state
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center py-12" role="status" aria-live="polite">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" aria-hidden="true"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
        </div>
      </div>
    )
  }
  // Sorting articles by publishedAt date in descending order (most recent first)
  const sortedArticles = [...data].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const fewarticle = sortedArticles;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container mx-auto px-4">
      {/* Articles Grid */}
       <div 
         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
         role="main"
         aria-label="News articles grid"
       >
        {fewarticle.map((currItem, index) => {
          // Skip articles without images
          if (!currItem.urlToImage) {
            return null
          }
          
          const categoryColors = getCategoryColor(currItem.source?.name, currItem.title);
          const readTime = calculateReadTime(currItem.description || currItem.title);
          const sourceIcon = getSourceIcon(currItem.source?.name);
          
          return (
            <article 
               key={index}
               className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-600 flex flex-col h-full card-focusable"
               role="article"
               aria-labelledby={`article-title-${index}`}
               aria-describedby={`article-description-${index}`}
               tabIndex="0"
             >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <LazyImage 
                  src={currItem.urlToImage} 
                  alt={currItem.title || "News article image"} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${categoryColors.bg} ${categoryColors.text} ${categoryColors.border} backdrop-blur-sm`}>
                  {categoryColors.category}
                </div>
                
                {/* Bookmark Button */}
                <div className="absolute top-3 right-3">
                  <BookmarkButton article={currItem} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" />
                </div>
              </div>
              
              {/* Content */}
               <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 
                  id={`article-title-${index}`}
                  className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                >
                  {currItem.title}
                </h3>
                
                {/* Description */}
                <p 
                  id={`article-description-${index}`}
                  className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow"
                >
                  {currItem.description || "No description available."}
                </p>
                
                {/* Source Information */}
                {currItem.source?.name && (
                  <div className="mb-3">
                    <span className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700">
                      <span className="mr-2 text-base">{sourceIcon}</span>
                      {currItem.source.name}
                    </span>
                  </div>
                )}
                
                {/* Meta Information */}
                <div 
                  className="flex items-center justify-start mb-4 text-sm text-gray-600 dark:text-gray-400 space-x-4"
                  role="group"
                  aria-label="Article metadata"
                >
                  <span className="flex items-center" aria-label={`Published on ${formatDate(currItem.publishedAt)}`}>
                    <svg className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(currItem.publishedAt)}
                  </span>
                  
                  {/* Read Time */}
                  <span className="flex items-center" aria-label={`Estimated reading time: ${readTime} minutes`}>
                    <svg className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {readTime} min read
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3 card-actions">
                  {/* Read More Button */}
                  <button 
                    onClick={() => window.open(currItem.url, '_blank', 'noopener,noreferrer')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        window.open(currItem.url, '_blank', 'noopener,noreferrer')
                      }
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus-enhanced btn-focus flex items-center group touch-target text-sm"
                    aria-label={`Read full article: ${currItem.title}`}
                    type="button"
                  >
                    <span>Read Article</span>
                    <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  
                  {/* Social Share Button */}
                  <SocialShare 
                    url={currItem.url}
                    title={currItem.title}
                    description={currItem.description}
                    className="flex-shrink-0"
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
      
      {/* No Articles Message */}
      {fewarticle.length === 0 && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <div className="text-6xl mb-4" aria-hidden="true">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Articles Found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try searching for different keywords or check back later.</p>
        </div>
      )}
    </div>
  )
}

// PropTypes validation
LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
}

Card.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Card