import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Breadcrumb = ({ currentPage, searchQuery = '', category = 'general' }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([])

  useEffect(() => {
    const crumbs = [{ name: 'Home', path: '/' }]
    
    if (currentPage === 'news') {
      crumbs.push({ name: 'News', path: '/news' })
      
      if (category && category !== 'general') {
        crumbs.push({ 
          name: category.charAt(0).toUpperCase() + category.slice(1), 
          path: `/news/${category}` 
        })
      }
      
      if (searchQuery) {
        crumbs.push({ 
          name: `Search: "${searchQuery}"`, 
          path: null 
        })
      }
    } else if (currentPage === 'weather') {
      crumbs.push({ name: 'Weather', path: '/weather' })
    } else if (currentPage === 'currency') {
      crumbs.push({ name: 'Currency Converter', path: '/currency' })
    }
    
    setBreadcrumbs(crumbs)
  }, [currentPage, searchQuery, category])

  const handleBreadcrumbClick = (path) => {
    if (path) {
      // In a real app, you'd use router navigation
      // For now, we'll just scroll to top or refresh
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky top-16 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm font-light">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg 
                  className="w-4 h-4 text-gray-400 mx-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {crumb.path ? (
                <button
                  onClick={() => handleBreadcrumbClick(crumb.path)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1 font-light"
                  aria-label={`Navigate to ${crumb.name}`}
                >
                  {crumb.name}
                </button>
              ) : (
                <span className="text-gray-500 dark:text-gray-400 font-normal">
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

Breadcrumb.propTypes = {
  currentPage: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
  category: PropTypes.string
}



export default Breadcrumb