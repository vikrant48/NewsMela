import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faTimes, faSearch, faCalendarAlt, faDownload, faExpand, faCompress, faArrowLeft, faArrowRight, faGlobe, faLanguage } from '@fortawesome/free-solid-svg-icons';

const EPaper = ({ onClose }) => {
    const [selectedNewspaper, setSelectedNewspaper] = useState('times-of-india');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('english');

    const newspapers = {
        'times-of-india': {
            name: 'The Times of India',
            logo: '📰',
            description: 'India\'s leading English daily',
            url: 'https://timesofindia.indiatimes.com/epaper',
            language: 'English',
            pages: 24,
            color: 'blue'
        },
        'hindustan-times': {
            name: 'Hindustan Times',
            logo: '📄',
            description: 'National English newspaper',
            url: 'https://www.hindustantimes.com/epaper',
            language: 'English',
            pages: 20,
            color: 'red'
        },
        'indian-express': {
            name: 'The Indian Express',
            logo: '📋',
            description: 'English-language daily newspaper',
            url: 'https://indianexpress.com/epaper/',
            language: 'English',
            pages: 18,
            color: 'orange'
        },
        'economic-times': {
            name: 'Economic Times',
            logo: '💼',
            description: 'Business and financial news',
            url: 'https://economictimes.indiatimes.com/epaper',
            language: 'English',
            pages: 16,
            color: 'green'
        },
        'dainik-jagran': {
            name: 'Dainik Jagran',
            logo: '🗞️',
            description: 'Hindi language daily newspaper',
            url: 'https://www.jagran.com/epaper/',
            language: 'Hindi',
            pages: 22,
            color: 'purple'
        },
        'amar-ujala': {
            name: 'Amar Ujala',
            logo: '📃',
            description: 'Hindi daily newspaper',
            url: 'https://www.amarujala.com/epaper',
            language: 'Hindi',
            pages: 20,
            color: 'indigo'
        }
    };

    const languages = [
        { id: 'english', name: 'English', flag: '🇬🇧' },
        { id: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
        { id: 'all', name: 'All Languages', flag: '🌐' }
    ];

    const filteredNewspapers = Object.entries(newspapers).filter(([, paper]) => {
        const matchesLanguage = selectedLanguage === 'all' || 
            (selectedLanguage === 'english' && paper.language === 'English') ||
            (selectedLanguage === 'hindi' && paper.language === 'Hindi');
        const matchesSearch = paper.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesLanguage && matchesSearch;
    });

    const currentNewspaper = newspapers[selectedNewspaper];

    const handleReadNow = (newspaperKey) => {
        const newspaper = newspapers[newspaperKey];
        window.open(newspaper.url, '_blank', 'noopener,noreferrer');
    };

    const handleDownload = () => {
        // Simulate download functionality
        alert(`Downloading ${currentNewspaper.name} - ${selectedDate}`);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const nextPage = () => {
        if (currentPage < currentNewspaper.pages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getColorClasses = (color, isSelected = false) => {
        const colors = {
            blue: isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
            red: isSelected ? 'bg-red-600 text-white border-red-600' : 'border-red-200 hover:border-red-400 hover:bg-red-50',
            orange: isSelected ? 'bg-orange-600 text-white border-orange-600' : 'border-orange-200 hover:border-orange-400 hover:bg-orange-50',
            green: isSelected ? 'bg-green-600 text-white border-green-600' : 'border-green-200 hover:border-green-400 hover:bg-green-50',
            purple: isSelected ? 'bg-purple-600 text-white border-purple-600' : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50',
            indigo: isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${isFullscreen ? 'p-0' : ''}`}>
            <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto ${isFullscreen ? 'max-w-full h-full rounded-none' : 'max-w-7xl'}`}>
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <FontAwesomeIcon icon={faNewspaper} className="text-2xl text-blue-600 dark:text-blue-400" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">E-Paper Hub</h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Read today&apos;s newspapers online</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={toggleFullscreen}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                            >
                                <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
                            </button>
                            <button 
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                                aria-label="Close e-paper modal"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Language Filter */}
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faLanguage} className="text-gray-600 dark:text-gray-400" />
                            <select 
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.id} value={lang.id}>
                                        {lang.flag} {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search */}
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search newspapers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Date Picker */}
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-600 dark:text-gray-400" />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Newspapers Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNewspapers.map(([key, newspaper]) => (
                            <div
                                key={key}
                                onClick={() => setSelectedNewspaper(key)}
                                className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                                    getColorClasses(newspaper.color, selectedNewspaper === key)
                                } ${selectedNewspaper !== key ? 'bg-white dark:bg-gray-700' : ''}`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-4xl">{newspaper.logo}</div>
                                    <div className="flex items-center space-x-1">
                                        <FontAwesomeIcon icon={faGlobe} className="text-sm text-gray-500" />
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            newspaper.language === 'English' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                                        }`}>
                                            {newspaper.language}
                                        </span>
                                    </div>
                                </div>
                                
                                <h3 className={`text-lg font-bold mb-2 ${
                                    selectedNewspaper === key ? 'text-white' : 'text-gray-900 dark:text-white'
                                }`}>
                                    {newspaper.name}
                                </h3>
                                
                                <p className={`text-sm mb-4 ${
                                    selectedNewspaper === key ? 'text-white opacity-90' : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                    {newspaper.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm ${
                                        selectedNewspaper === key ? 'text-white opacity-90' : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                        {newspaper.pages} pages
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleReadNow(key);
                                        }}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                            selectedNewspaper === key 
                                                ? 'bg-white text-gray-900 hover:bg-gray-100' 
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        Read Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Newspaper Preview */}
                {selectedNewspaper && (
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{currentNewspaper.logo}</span>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {currentNewspaper.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {selectedDate} • Page {currentPage} of {currentNewspaper.pages}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === currentNewspaper.pages}
                                    className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                                >
                                    <FontAwesomeIcon icon={faDownload} />
                                </button>
                                <button
                                    onClick={() => handleReadNow(selectedNewspaper)}
                                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-all duration-200"
                                >
                                    Open Full Reader
                                </button>
                            </div>
                        </div>
                        
                        {/* Mock newspaper preview */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-600 min-h-96 flex items-center justify-center">
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <FontAwesomeIcon icon={faNewspaper} className="text-6xl mb-4" />
                                <p className="text-lg font-medium mb-2">Newspaper Preview</p>
                                <p className="text-sm">Click &quot;Open Full Reader&quot; to read the complete newspaper</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

EPaper.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default EPaper;