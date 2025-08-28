import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop, faPalette, faTimes, faCheck, faAdjust, faEye } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = ({ onClose, isModal = false }) => {
    const [currentTheme, setCurrentTheme] = useState('light');
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [accentColor, setAccentColor] = useState('blue');
    const [fontSize, setFontSize] = useState('medium');
    const [highContrast, setHighContrast] = useState(false);

    const themes = [
        {
            id: 'light',
            name: 'Light Mode',
            icon: faSun,
            description: 'Clean and bright interface',
            preview: 'bg-white text-gray-900',
            gradient: 'from-yellow-400 to-orange-500'
        },
        {
            id: 'dark',
            name: 'Dark Mode',
            icon: faMoon,
            description: 'Easy on the eyes in low light',
            preview: 'bg-gray-900 text-white',
            gradient: 'from-purple-600 to-blue-600'
        },
        {
            id: 'auto',
            name: 'System',
            icon: faDesktop,
            description: 'Follows your system preference',
            preview: 'bg-gradient-to-r from-gray-100 to-gray-800 text-gray-700',
            gradient: 'from-green-400 to-blue-500'
        },
        {
            id: 'sepia',
            name: 'Sepia',
            icon: faAdjust,
            description: 'Warm, paper-like reading experience',
            preview: 'bg-yellow-50 text-yellow-900',
            gradient: 'from-yellow-600 to-orange-600'
        }
    ];

    const accentColors = [
        { id: 'blue', name: 'Blue', color: 'bg-blue-500', class: 'accent-blue' },
        { id: 'green', name: 'Green', color: 'bg-green-500', class: 'accent-green' },
        { id: 'purple', name: 'Purple', color: 'bg-purple-500', class: 'accent-purple' },
        { id: 'red', name: 'Red', color: 'bg-red-500', class: 'accent-red' },
        { id: 'orange', name: 'Orange', color: 'bg-orange-500', class: 'accent-orange' },
        { id: 'pink', name: 'Pink', color: 'bg-pink-500', class: 'accent-pink' }
    ];

    const fontSizes = [
        { id: 'small', name: 'Small', size: 'text-sm', description: 'Compact text' },
        { id: 'medium', name: 'Medium', size: 'text-base', description: 'Default size' },
        { id: 'large', name: 'Large', size: 'text-lg', description: 'Easier to read' },
        { id: 'xl', name: 'Extra Large', size: 'text-xl', description: 'Maximum readability' }
    ];

    useEffect(() => {
        // Load saved preferences
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedAccent = localStorage.getItem('accentColor') || 'blue';
        const savedFontSize = localStorage.getItem('fontSize') || 'medium';
        const savedHighContrast = localStorage.getItem('highContrast') === 'true';

        setCurrentTheme(savedTheme);
        setAccentColor(savedAccent);
        setFontSize(savedFontSize);
        setHighContrast(savedHighContrast);

        applyTheme(savedTheme, savedAccent, savedFontSize, savedHighContrast);
    }, []);

    const applyTheme = (theme, accent, font, contrast) => {
        const root = document.documentElement;
        
        // Remove existing theme classes
        root.classList.remove('light', 'dark', 'sepia', 'high-contrast');
        
        // Apply theme
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.add(prefersDark ? 'dark' : 'light');
        } else {
            root.classList.add(theme);
        }

        // Apply high contrast
        if (contrast) {
            root.classList.add('high-contrast');
        }

        // Apply accent color
        root.setAttribute('data-accent', accent);
        
        // Apply font size
        root.setAttribute('data-font-size', font);

        // Save preferences
        localStorage.setItem('theme', theme);
        localStorage.setItem('accentColor', accent);
        localStorage.setItem('fontSize', font);
        localStorage.setItem('highContrast', contrast.toString());
    };

    const handleThemeChange = (themeId) => {
        setCurrentTheme(themeId);
        applyTheme(themeId, accentColor, fontSize, highContrast);
    };

    const handleAccentChange = (colorId) => {
        setAccentColor(colorId);
        applyTheme(currentTheme, colorId, fontSize, highContrast);
    };

    const handleFontSizeChange = (sizeId) => {
        setFontSize(sizeId);
        applyTheme(currentTheme, accentColor, sizeId, highContrast);
    };

    const handleContrastToggle = () => {
        const newContrast = !highContrast;
        setHighContrast(newContrast);
        applyTheme(currentTheme, accentColor, fontSize, newContrast);
    };

    const resetToDefaults = () => {
        setCurrentTheme('light');
        setAccentColor('blue');
        setFontSize('medium');
        setHighContrast(false);
        applyTheme('light', 'blue', 'medium', false);
    };

    // Simple toggle for non-modal use
    if (!showThemeModal && !isModal) {
        return (
            <button
                onClick={() => setShowThemeModal(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                aria-label="Theme settings"
            >
                <FontAwesomeIcon 
                    icon={currentTheme === 'light' ? faSun : currentTheme === 'dark' ? faMoon : faDesktop} 
                />
            </button>
        );
    }

    return (
        <>
            {(isModal || showThemeModal) && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
                    onClick={(e) => {
                         if (e.target === e.currentTarget) {
                             if (isModal && onClose) {
                                 onClose();
                             } else {
                                 setShowThemeModal(false);
                             }
                         }
                     }}
                >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl my-8 relative">
                        <div className="max-h-[80vh] overflow-y-auto">
                            {/* Header */}
                            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-xl z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faPalette} className="text-2xl text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Theme Settings</h2>
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">Customize your reading experience</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        if (isModal && onClose) {
                                            onClose();
                                        } else {
                                            setShowThemeModal(false);
                                        }
                                    }}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                                    aria-label="Close theme settings"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        </div>

                            <div className="p-6 space-y-8">
                            {/* Theme Selection */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faPalette} className="mr-2 text-blue-600 dark:text-blue-400" />
                                    Theme Mode
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {themes.map((theme) => (
                                        <div
                                            key={theme.id}
                                            onClick={() => handleThemeChange(theme.id)}
                                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                                currentTheme === theme.id
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                                            }`}
                                        >
                                            {currentTheme === theme.id && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                                                </div>
                                            )}
                                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${theme.gradient} flex items-center justify-center mb-3`}>
                                                <FontAwesomeIcon icon={theme.icon} className="text-white text-xl" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{theme.name}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{theme.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Accent Color */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faPalette} className="mr-2 text-blue-600 dark:text-blue-400" />
                                    Accent Color
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {accentColors.map((color) => (
                                        <button
                                            key={color.id}
                                            onClick={() => handleAccentChange(color.id)}
                                            className={`relative w-12 h-12 rounded-full ${color.color} transition-all duration-200 hover:scale-110 ${
                                                accentColor === color.id ? 'ring-4 ring-offset-2 ring-gray-400 dark:ring-offset-gray-800' : ''
                                            }`}
                                            aria-label={`Select ${color.name} accent color`}
                                        >
                                            {accentColor === color.id && (
                                                <FontAwesomeIcon icon={faCheck} className="text-white" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Font Size */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faEye} className="mr-2 text-blue-600 dark:text-blue-400" />
                                    Font Size
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {fontSizes.map((size) => (
                                        <button
                                            key={size.id}
                                            onClick={() => handleFontSizeChange(size.id)}
                                            className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                                                fontSize === size.id
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                                            }`}
                                        >
                                            <div className={`font-semibold ${size.size} text-gray-900 dark:text-white`}>
                                                {size.name}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                {size.description}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Accessibility Options */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faAdjust} className="mr-2 text-blue-600 dark:text-blue-400" />
                                    Accessibility
                                </h3>
                                <div className="space-y-3">
                                    <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200">
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">High Contrast</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Increase contrast for better readability</div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={highContrast}
                                            onChange={handleContrastToggle}
                                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Preview */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
                                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="space-y-3">
                                        <h4 className={`font-bold ${fontSizes.find(f => f.id === fontSize)?.size} text-gray-900 dark:text-white`}>
                                            Sample News Headline
                                        </h4>
                                        <p className={`${fontSizes.find(f => f.id === fontSize)?.size} text-gray-700 dark:text-gray-300`}>
                                            This is how your news articles will appear with the current theme settings. 
                                            The text size and contrast have been adjusted according to your preferences.
                                        </p>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${accentColor}-100 text-${accentColor}-800 dark:bg-${accentColor}-900 dark:text-${accentColor}-200`}>
                                                Technology
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={resetToDefaults}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                                    >
                                        Reset to Defaults
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (isModal && onClose) {
                                                onClose();
                                            } else {
                                                setShowThemeModal(false);
                                            }
                                        }}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

ThemeToggle.propTypes = {
    onClose: PropTypes.func,
    isModal: PropTypes.bool
};

export default ThemeToggle;