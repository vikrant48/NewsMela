import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Weather from './Weather'
import Newspaper from './NewsPaper'
import CurrencyConvertor from './CurrencyConvertor'
import Breadcrumb from './Breadcrumb'
import BackToTop from './BackToTop'
import SearchHistory from './SearchHistory'
import InfiniteScroll from './InfiniteScroll'




const News = ({ category = 'general' }) => {
  const [newsData, setnewsData] = useState()
  const [search, setsearch] = useState("Search news")
  const [activeModal, setActiveModal] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSearchHistory, setShowSearchHistory] = useState(false)
  const [currentPage] = useState('news')
  const searchInputRef = useRef(null)
  
  // Filter states
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [selectedSource, setSelectedSource] = useState('')
  const [showFilters, setShowFilters] = useState(false)


  const NEWS_API_KEY1 = import.meta.env.VITE_NEWS_API_KEY;
// const NEWS_API_KEY2 = import.meta.env.VITE_NEWS_API_KEY;

  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];

  const oneMonthBack = new Date(today);
  oneMonthBack.setMonth(oneMonthBack.getMonth() - 1);
  const oneMonthBackFormatted = oneMonthBack.toISOString().split('T')[0];


  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 25);

  const getData = async () => {
    try {
      setIsLoading(true)
      
      // Use filter dates or default to one month back
      const fromDate = dateRange.from || oneMonthBackFormatted
      const toDate = dateRange.to || todayFormatted
      
      // Build API URL with filters - use category for top headlines or search for everything
      let apiUrl
      if (search === "Search news" || search === "") {
        // Use top headlines API with category
        apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${NEWS_API_KEY1}`
      } else {
        // Use everything API with search query
        apiUrl = `https://newsapi.org/v2/everything?q=${search}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=${NEWS_API_KEY1}`
      }
      
      // Add source filter if selected (only for everything API)
      if (selectedSource && search !== "Search news" && search !== "") {
        apiUrl += `&sources=${selectedSource}`
      }
      
      const responce = await fetch(apiUrl)

      const jsonData = await responce.json();
      console.log("Fetched news data:", jsonData);
      setnewsData(jsonData.articles)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [search, dateRange, selectedSource, category])
  
  // Filter handling functions
  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSourceChange = (source) => {
    setSelectedSource(source)
  }
  
  const clearFilters = () => {
    setDateRange({ from: '', to: '' })
    setSelectedSource('')
  }
  
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleinput = (e) => {
    setsearch(e.target.value)
    setShowSearchHistory(true)
  }
  
  const userInput = (e) => {
    setsearch(e.target.value)
    setShowSearchHistory(false)
  }
  
  const handleSearchSelect = (searchTerm) => {
    setsearch(searchTerm)
    setShowSearchHistory(false)
  }
  
  const handleSearchFocus = () => {
    setShowSearchHistory(true)
  }
  
  const handleSearchBlur = () => {
    // Delay hiding to allow for click events
    setTimeout(() => setShowSearchHistory(false), 150)
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSearchHistory(false)
      searchInputRef.current?.blur()
    }
  }
  
  const handleCategoryKeyDown = (e, categoryValue) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setsearch(categoryValue)
      setShowSearchHistory(false)
    }
  }
  
  const handleModalKeyDown = (e, modalType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openModal(modalType)
    } else if (e.key === 'Escape') {
      closeModal()
    }
  }
  
  // Global keyboard event listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal()
      }
    }
    
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [activeModal])
  
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (search && search !== "Search news") {
      getData()
    }
  }

  const openModal = (modalType) => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <>
      {/* Nav removed - handled by App.jsx */}
      <Breadcrumb 
        currentPage={currentPage} 
        searchQuery={search !== "Search news" ? search : ""} 
        category={search !== "Search news" ? search : "general"} 
      />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-4">
        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          {isLoading && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]" style={{backgroundPosition: '-200% 0'}}></div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">Searching for news...</p>
              </div>
            </div>
          )}

          {/* Search Bar and Filters in One Line */}
          <div className="max-w-7xl mx-auto mb-4">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* Search Bar */}
              <div className="flex-1 w-full lg:w-auto">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="relative flex items-center">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search news..."
                      value={search === "Search news" ? "" : search}
                      onChange={handleinput}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      onKeyDown={handleKeyDown}
                      className="w-full px-6 py-3 text-base font-semibold border-2 border-gray-300 dark:border-gray-600 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                      autoComplete="off"
                    />
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-r-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-2 border-blue-600 hover:border-blue-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                  <SearchHistory 
                    onSearchSelect={handleSearchSelect}
                    currentSearch={search === "Search news" ? "" : (search || "")}
                    isVisible={showSearchHistory}
                    onClose={() => setShowSearchHistory(false)}
                  />
                </form>
              </div>

              {/* Filters Toggle and Quick Filters */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleFilters}
                  className="flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-bold text-sm">Filters</span>
                  <svg className={`w-3 h-3 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Quick Filter Indicators */}
                {(dateRange.from || dateRange.to || selectedSource) && (
                  <div className="flex items-center space-x-2">
                    {(dateRange.from || dateRange.to) && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">📅 Date</span>
                    )}
                    {selectedSource && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">📰 Source</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Date Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => handleDateRangeChange('from', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        placeholder="From"
                      />
                      <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => handleDateRangeChange('to', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        placeholder="To"
                      />
                    </div>
                  </div>
                  
                  {/* Source Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">News Source</label>
                    <select
                      value={selectedSource}
                      onChange={(e) => handleSourceChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="">All Sources</option>
                      <option value="bbc-news">BBC News</option>
                      <option value="cnn">CNN</option>
                      <option value="reuters">Reuters</option>
                      <option value="associated-press">Associated Press</option>
                      <option value="the-guardian-uk">The Guardian</option>
                      <option value="the-new-york-times">The New York Times</option>
                      <option value="the-washington-post">The Washington Post</option>
                      <option value="techcrunch">TechCrunch</option>
                      <option value="espn">ESPN</option>
                      <option value="bloomberg">Bloomberg</option>
                    </select>
                  </div>
                  
                  {/* Filter Actions */}
                  <div className="flex flex-col justify-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category Buttons - Single Line */}
          <div className="mb-4">
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'India', value: 'India', icon: '🇮🇳' },
                { label: 'Sports', value: 'Sport', icon: '⚽' },
                { label: 'Politics', value: 'Politics', icon: '🏛️' },
                { label: 'Entertainment', value: 'Entertainment', icon: '🎬' },
                { label: 'International', value: 'International', icon: '🌍' },
                { label: 'Fitness', value: 'Fitness', icon: '💪' },
                { label: 'Business', value: 'Business', icon: '💼' },
                { label: 'World', value: 'World', icon: '🌎' },
                { label: 'Arts', value: 'Arts', icon: '🎨' },
                { label: 'AI', value: 'AI', icon: '🤖' }
              ].map((category) => (
                <button
                  key={category.value}
                  onClick={userInput}
                  onKeyDown={(e) => handleCategoryKeyDown(e, category.value)}
                  value={category.value}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    search === category.value
                      ? 'bg-blue-600 text-white shadow-lg focus:ring-blue-500'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600 focus:ring-blue-500'
                  }`}
                  tabIndex={0}
                  aria-label={`Search for ${category.label} news`}
                >
                  <span className="mr-1">{category.icon}</span>
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Access Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => openModal('newspaper')}
              onKeyDown={(e) => handleModalKeyDown(e, 'newspaper')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              tabIndex={0}
              aria-label="Open newspaper modal"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">📰</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Newspaper</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Read latest newspaper articles</p>
              </div>
            </button>
            <button
              onClick={() => openModal('currency')}
              onKeyDown={(e) => handleModalKeyDown(e, 'currency')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              tabIndex={0}
              aria-label="Open currency converter modal"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">💱</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Currency Converter</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Convert currencies in real-time</p>
              </div>
            </button>
            <button
              onClick={() => openModal('weather')}
              onKeyDown={(e) => handleModalKeyDown(e, 'weather')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              tabIndex={0}
              aria-label="Open weather modal"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">🌤️</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Weather</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Check current weather conditions</p>
              </div>
            </button>
          </div>
          
          {/* News Cards Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-3">📰</span>
              {search && search !== "Search news" ? `News for "${search}"` : "Latest News"}
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-1/2"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : newsData && newsData.length > 0 ? (
              <InfiniteScroll 
                initialData={newsData}
                searchQuery={search !== "Search news" ? (search || "general") : "general"}
                apiKey={NEWS_API_KEY1}
                isLoading={isLoading}
                onLoadingChange={setIsLoading}
                dateRange={dateRange}
                selectedSource={selectedSource}
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">No news articles found</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Try searching for different keywords</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Modal Overlay */}
        {activeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  {activeModal === 'newspaper' && (
                    <>
                      <span className="mr-3">📰</span>
                      Newspaper
                    </>
                  )}
                  {activeModal === 'currency' && (
                    <>
                      <span className="mr-3">💱</span>
                      Currency Converter
                    </>
                  )}
                  {activeModal === 'weather' && (
                    <>
                      <span className="mr-3">🌤️</span>
                      Weather
                    </>
                  )}
                </h2>
                <button
                  onClick={closeModal}
                  onKeyDown={(e) => e.key === 'Enter' && closeModal()}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  tabIndex={0}
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                {activeModal === 'newspaper' && <Newspaper />}
                {activeModal === 'currency' && <CurrencyConvertor />}
                {activeModal === 'weather' && <Weather />}
              </div>
            </div>
          </div>
        )}
        
        {/* Footer removed - handled by App.jsx */}
        <BackToTop />
    </>

  )
}

News.propTypes = {
  category: PropTypes.string
}

export default News
