
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserAccount from './UserAccount';
import ThemeToggle from './ThemeToggle';
import Explore from './Explore';
import Games from './Games';
import Subscription from './Subscription';
import EPaper from './EPaper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCompass } from '@fortawesome/free-solid-svg-icons';


const Nav = ({ onCategorySelect }) => {
    const [showUserAccount, setShowUserAccount] = useState(false);
    const [showExplore, setShowExplore] = useState(false);
    const [showGames, setShowGames] = useState(false);
    const [showSubscription, setShowSubscription] = useState(false);
    const [showEPaper, setShowEPaper] = useState(false);
    const [showTheme, setShowTheme] = useState(false);
    // const [menuOpen, setMenuOpen] = useState(false);
    const [time, setTime] = useState(new Date());


    const toggleUserAccount = () => {
        setShowUserAccount(!showUserAccount);
    };

    const toggleExplore = () => {
        setShowExplore(!showExplore);
    };

    const toggleGames = () => {
        setShowGames(!showGames);
    };

    const toggleSubscription = () => {
        setShowSubscription(!showSubscription);
    };

    const toggleEPaper = () => {
        setShowEPaper(!showEPaper);
    };

    const toggleTheme = () => {
        setShowTheme(!showTheme);
    };

    const handleCategorySelect = (category) => {
        setShowExplore(false);
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    };




    const getFormattedDate = () => {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval); 
      }, []);

      const formatTime = (date) => {

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left Section */}
                    <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="flex items-center space-x-1">
                            <button 
                                onClick={toggleExplore}
                                className="flex items-center space-x-1 px-2 py-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200 focus-enhanced" 
                                aria-label="Explore menu"
                            >
                                <FontAwesomeIcon icon={faCompass} className="text-lg" />
                                <span className="hidden sm:inline font-bold">Explore</span>
                            </button>
                            <button className="p-1.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-all duration-200 focus-enhanced" aria-label="Go to home page">
                                <FontAwesomeIcon icon={faHouse} className="text-lg" />
                            </button>
                        </div>
                        <div className="hidden lg:block h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                        <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 hidden md:block font-semibold">
                            <span className="hidden lg:inline font-bold">{getFormattedDate()} • </span>
                            <span className="font-mono font-bold">{formatTime(time)}</span>
                        </span>
                    </div>
                    
                    {/* Center Logo */}
                    <div className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2">
                        <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent tracking-tight">NEWSMELA</h1>
                    </div>
                    
                    {/* Right Section */}
                    <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className="flex items-center space-x-1 lg:space-x-2">
                            <button onClick={toggleGames} className="text-xs lg:text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-all duration-200 hidden sm:block focus-enhanced" aria-label="Open games hub">
                                <span className="mr-1">🎮</span>
                                <span className="hidden lg:inline font-bold">Games</span>
                            </button>
                            <button onClick={toggleEPaper} className="text-xs lg:text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-all duration-200 hidden sm:block focus-enhanced" aria-label="Open E-Paper hub">
                                <span className="mr-1">📰</span>
                                <span className="hidden lg:inline font-bold">E-Paper</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <button onClick={toggleSubscription} className="px-3 py-1.5 text-xs lg:text-sm font-bold text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all duration-200 focus-enhanced" aria-label="Subscribe to newsletter">
                                <span className="hidden sm:inline font-bold">Subscribe</span>
                                <span className="sm:hidden">📧</span>
                            </button>
                            <button className="px-3 py-1.5 text-xs lg:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md focus-enhanced" onClick={toggleUserAccount} aria-label="Sign in to your account">
                                <span className="hidden sm:inline font-bold">Sign In</span>
                                <span className="sm:hidden">👤</span>
                            </button>
                            <ThemeToggle onClose={toggleTheme} />
                        </div>
                    </div>
                </div>
            </div>

            {/* User Account Modal */}
            {showUserAccount && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
                        <button 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl focus-enhanced" 
                            onClick={toggleUserAccount}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    toggleUserAccount()
                                } else if (e.key === 'Escape') {
                                    toggleUserAccount()
                                }
                            }}
                            aria-label="Close sign in modal"
                        >✖</button>
                        <UserAccount />
                    </div>
                </div>
            )}

            {/* Explore Modal */}
            {showExplore && (
                <Explore 
                    onCategorySelect={handleCategorySelect}
                    onClose={toggleExplore}
                />
            )}

            {/* Games Modal */}
            {showGames && (
                <Games 
                    onClose={toggleGames}
                />
            )}

            {/* Subscription Modal */}
            {showSubscription && (
                <Subscription 
                    onClose={toggleSubscription}
                />
            )}

            {/* E-Paper Modal */}
            {showEPaper && (
                <EPaper 
                    onClose={toggleEPaper}
                />
            )}

            {/* Theme Modal */}
            {showTheme && (
                <ThemeToggle 
                    onClose={toggleTheme}
                    isModal={true}
                />
            )}
        </nav>
    );
};

Nav.propTypes = {
    onCategorySelect: PropTypes.func
};

export default Nav;
