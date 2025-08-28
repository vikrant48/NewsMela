import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faGlobe, faStar, faChartLine, faNewspaper, faCar, faHeartbeat, faLaptop, faFootballBall } from '@fortawesome/free-solid-svg-icons';

const Explore = ({ onCategorySelect, onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { id: 'trending', name: 'Trending', icon: faFire, color: 'text-red-500', description: 'Hot topics right now' },
        { id: 'world', name: 'World News', icon: faGlobe, color: 'text-blue-500', description: 'Global headlines' },
        { id: 'top-headlines', name: 'Top Stories', icon: faStar, color: 'text-yellow-500', description: 'Most important news' },
        { id: 'business', name: 'Business', icon: faChartLine, color: 'text-green-500', description: 'Markets & finance' },
        { id: 'general', name: 'General', icon: faNewspaper, color: 'text-gray-500', description: 'All categories' },
        { id: 'entertainment', name: 'Entertainment', icon: faStar, color: 'text-purple-500', description: 'Movies, TV & celebrities' },
        { id: 'sports', name: 'Sports', icon: faFootballBall, color: 'text-orange-500', description: 'Latest sports news' },
        { id: 'technology', name: 'Technology', icon: faLaptop, color: 'text-indigo-500', description: 'Tech innovations' },
        { id: 'health', name: 'Health', icon: faHeartbeat, color: 'text-pink-500', description: 'Health & wellness' },
        { id: 'automotive', name: 'Automotive', icon: faCar, color: 'text-gray-600', description: 'Cars & vehicles' }
    ];

    const trendingTopics = [
        'Breaking News',
        'Climate Change',
        'Artificial Intelligence',
        'Space Exploration',
        'Cryptocurrency',
        'Global Economy',
        'Healthcare Innovation',
        'Renewable Energy'
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category.id);
        if (onCategorySelect) {
            onCategorySelect(category.id);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Explore News</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Discover stories that matter to you</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                            aria-label="Close explore menu"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Categories Grid */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browse by Category</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                                        selectedCategory === category.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                    }`}
                                >
                                    <div className="flex flex-col items-center text-center space-y-2">
                                        <FontAwesomeIcon 
                                            icon={category.icon} 
                                            className={`text-2xl ${category.color}`} 
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white text-sm">
                                                {category.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {category.description}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Trending Topics */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <FontAwesomeIcon icon={faFire} className="text-red-500 mr-2" />
                            Trending Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {trendingTopics.map((topic, index) => (
                                <button
                                    key={index}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                                >
                                    #{topic.replace(' ', '')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left">
                                <div className="font-semibold">📰 Latest Headlines</div>
                                <div className="text-sm opacity-90 mt-1">Get the most recent news updates</div>
                            </button>
                            <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 text-left">
                                <div className="font-semibold">🔍 Advanced Search</div>
                                <div className="text-sm opacity-90 mt-1">Find specific news with filters</div>
                            </button>
                            <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-left">
                                <div className="font-semibold">📊 News Analytics</div>
                                <div className="text-sm opacity-90 mt-1">Trending stories and statistics</div>
                            </button>
                            <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 text-left">
                                <div className="font-semibold">⚡ Breaking News</div>
                                <div className="text-sm opacity-90 mt-1">Live updates and alerts</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Explore.propTypes = {
    onCategorySelect: PropTypes.func,
    onClose: PropTypes.func
};

export default Explore;