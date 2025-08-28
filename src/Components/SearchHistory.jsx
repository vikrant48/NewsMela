import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const SearchHistory = ({ onSearchSelect, currentSearch, isVisible, onClose }) => {
  const [searchHistory, setSearchHistory] = useState([])
  const [suggestions] = useState([
    'Technology', 'Sports', 'Business', 'Health', 'Science',
    'Entertainment', 'Politics', 'World News', 'Climate Change',
    'Artificial Intelligence', 'Cryptocurrency', 'Space Exploration'
  ])
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem('newsSearchHistory')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, onClose])

  const addToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return
    
    const updatedHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 10)
    setSearchHistory(updatedHistory)
    localStorage.setItem('newsSearchHistory', JSON.stringify(updatedHistory))
  }

  const handleSearchSelect = (searchTerm) => {
    addToHistory(searchTerm)
    onSearchSelect(searchTerm)
    onClose()
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('newsSearchHistory')
  }

  const handleKeyDown = (event, searchTerm) => {
    if (event.key === 'Enter') {
      handleSearchSelect(searchTerm)
    } else if (event.key === 'Escape') {
      onClose()
    }
  }

  const searchTerm = currentSearch || ''
  
  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(searchTerm.toLowerCase()) &&
    suggestion.toLowerCase() !== searchTerm.toLowerCase()
  ).slice(0, 5)

  const filteredHistory = searchHistory.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.toLowerCase() !== searchTerm.toLowerCase()
  ).slice(0, 5)

  if (!isVisible) return null

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
      role="listbox"
      aria-label="Search suggestions and history"
    >
      {/* Recent Searches */}
      {filteredHistory.length > 0 && (
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Recent Searches
            </h3>
            <button
              onClick={clearHistory}
              className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded px-1"
              aria-label="Clear search history"
            >
              Clear
            </button>
          </div>
          {filteredHistory.map((item, index) => (
            <button
              key={`history-${index}`}
              onClick={() => handleSearchSelect(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
              role="option"
              tabIndex={0}
            >
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {filteredSuggestions.length > 0 && (
        <div className="p-2 border-t border-gray-200 dark:border-gray-600">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Suggestions
          </h3>
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={`suggestion-${index}`}
              onClick={() => handleSearchSelect(suggestion)}
              onKeyDown={(e) => handleKeyDown(e, suggestion)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
              role="option"
              tabIndex={0}
            >
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {filteredHistory.length === 0 && filteredSuggestions.length === 0 && currentSearch.trim() && (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          No suggestions found
        </div>
      )}

      {/* Empty state */}
      {filteredHistory.length === 0 && filteredSuggestions.length === 0 && !currentSearch.trim() && (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          Start typing to see suggestions
        </div>
      )}
    </div>
  )
}

SearchHistory.propTypes = {
  onSearchSelect: PropTypes.func.isRequired,
  currentSearch: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default SearchHistory