import { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

const InfiniteScroll = ({ 
  initialData = [], 
  searchQuery = 'general', 
  apiKey, 
  isLoading, 
  onLoadingChange,
  dateRange = { from: '', to: '' },
  selectedSource = ''
}) => {
  const [allArticles, setAllArticles] = useState(initialData || [])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const observerRef = useRef()
  const loadingRef = useRef()

  // Reset when search query changes
  useEffect(() => {
    setAllArticles(initialData || [])
    setPage(1)
    setHasMore(true)
  }, [initialData, searchQuery])

  const loadMoreArticles = useCallback(async () => {
    if (loadingMore || !hasMore || isLoading) return

    setLoadingMore(true)
    onLoadingChange(true)

    try {
      const today = new Date()
      const todayFormatted = today.toISOString().split('T')[0]
      const oneMonthBack = new Date(today)
      oneMonthBack.setMonth(oneMonthBack.getMonth() - 1)
      const oneMonthBackFormatted = oneMonthBack.toISOString().split('T')[0]

      // Use filter dates or default to one month back
      const fromDate = dateRange.from || oneMonthBackFormatted
      const toDate = dateRange.to || todayFormatted
      
      // Build API URL with filters
      let apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&page=${page + 1}&pageSize=20&apiKey=${apiKey}`
      
      // Add source filter if selected
      if (selectedSource) {
        apiUrl += `&sources=${selectedSource}`
      }

      const response = await fetch(apiUrl)
      const jsonData = await response.json()

      if (jsonData.articles && jsonData.articles.length > 0) {
        // Filter out duplicates based on title
        const existingTitles = new Set(allArticles.map(article => article.title))
        const newArticles = jsonData.articles.filter(
          article => !existingTitles.has(article.title)
        )

        if (newArticles.length > 0) {
          setAllArticles(prev => [...prev, ...newArticles])
          setPage(prev => prev + 1)
        } else {
          setHasMore(false)
        }
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error loading more articles:', error)
      setHasMore(false)
    } finally {
      setLoadingMore(false)
      onLoadingChange(false)
    }
  }, [loadingMore, hasMore, isLoading, searchQuery, page, allArticles, apiKey, onLoadingChange])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !isLoading) {
          loadMoreArticles()
        }
      },
      { threshold: 0.1 }
    )

    observerRef.current = observer

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMoreArticles, hasMore, loadingMore, isLoading])

  // Keyboard navigation for load more
  const handleKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && hasMore && !loadingMore && !isLoading) {
      event.preventDefault()
      loadMoreArticles()
    }
  }

  if (!allArticles || allArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📰</div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">No news articles found</p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Try searching for different keywords</p>
      </div>
    )
  }

  return (
    <div>
      <Card data={allArticles} />
      
      {/* Loading indicator and load more trigger */}
      <div 
        ref={loadingRef}
        className="mt-8 text-center"
      >
        {loadingMore ? (
          <div className="flex items-center justify-center space-x-2 py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading more articles...</p>
          </div>
        ) : hasMore ? (
          <button
            onClick={loadMoreArticles}
            onKeyDown={handleKeyDown}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg"
            disabled={isLoading}
            tabIndex={0}
            aria-label="Load more articles"
          >
            Load More Articles
          </button>
        ) : (
          <div className="py-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              You&apos;ve reached the end of the articles
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

InfiniteScroll.propTypes = {
  initialData: PropTypes.array,
  searchQuery: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLoadingChange: PropTypes.func.isRequired,
  dateRange: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string
  }),
  selectedSource: PropTypes.string
}



export default InfiniteScroll