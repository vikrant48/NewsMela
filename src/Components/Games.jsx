import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faFire, faStar, faUsers, faCrown, faPuzzlePiece, faCar, faFootballBall, faChess, faRocket } from '@fortawesome/free-solid-svg-icons';

const Games = ({ onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState('popular');

    const gameCategories = [
        { id: 'popular', name: 'Popular', icon: faFire },
        { id: 'action', name: 'Action', icon: faRocket },
        { id: 'puzzle', name: 'Puzzle', icon: faPuzzlePiece },
        { id: 'sports', name: 'Sports', icon: faFootballBall },
        { id: 'racing', name: 'Racing', icon: faCar },
        { id: 'strategy', name: 'Strategy', icon: faChess }
    ];

    const games = {
        popular: [
            { id: 1, name: 'Subway Surfers', description: 'Endless running adventure', rating: 4.8, players: '1M+', image: '🏃‍♂️', url: 'https://poki.com/en/g/subway-surfers' },
            { id: 2, name: 'Temple Run 2', description: 'Navigate perilous cliffs', rating: 4.7, players: '800K+', image: '🏛️', url: 'https://poki.com/en/g/temple-run-2' },
            { id: 3, name: 'Cut the Rope', description: 'Physics puzzle game', rating: 4.9, players: '600K+', image: '🍭', url: 'https://poki.com/en/g/cut-the-rope' },
            { id: 4, name: 'Stickman Hook', description: 'Swing and jump adventure', rating: 4.6, players: '500K+', image: '🪝', url: 'https://poki.com/en/g/stickman-hook' },
            { id: 5, name: 'Bubble Shooter', description: 'Classic bubble popping', rating: 4.5, players: '700K+', image: '🫧', url: 'https://poki.com/en/g/bubble-shooter' },
            { id: 6, name: 'Crossy Road', description: 'Cross the busy roads', rating: 4.4, players: '400K+', image: '🐔', url: 'https://poki.com/en/g/crossy-road' }
        ],
        action: [
            { id: 7, name: 'Bullet Force', description: 'Multiplayer FPS action', rating: 4.7, players: '300K+', image: '🔫', url: 'https://poki.com/en/g/bullet-force-multiplayer' },
            { id: 8, name: 'Zombs Royale', description: 'Battle royale survival', rating: 4.6, players: '250K+', image: '🧟', url: 'https://poki.com/en/g/zombs-royale-io' },
            { id: 9, name: 'Ninja Clash Heroes', description: 'Ninja combat game', rating: 4.5, players: '200K+', image: '🥷', url: 'https://poki.com/en/g/ninja-clash-heroes' }
        ],
        puzzle: [
            { id: 10, name: '2048', description: 'Number puzzle challenge', rating: 4.8, players: '900K+', image: '🔢', url: 'https://poki.com/en/g/2048' },
            { id: 11, name: 'Tetris', description: 'Classic block puzzle', rating: 4.9, players: '1.2M+', image: '🧩', url: 'https://poki.com/en/g/tetris' },
            { id: 12, name: 'Mahjong', description: 'Traditional tile matching', rating: 4.6, players: '350K+', image: '🀄', url: 'https://poki.com/en/g/mahjong-connect' }
        ],
        sports: [
            { id: 13, name: 'Basketball Stars', description: 'Street basketball action', rating: 4.7, players: '400K+', image: '🏀', url: 'https://poki.com/en/g/basketball-stars' },
            { id: 14, name: 'Soccer Skills', description: 'Football penalty shots', rating: 4.5, players: '300K+', image: '⚽', url: 'https://poki.com/en/g/penalty-shooters-2' },
            { id: 15, name: 'Tennis Masters', description: 'Professional tennis', rating: 4.4, players: '150K+', image: '🎾', url: 'https://poki.com/en/g/tennis-masters' }
        ],
        racing: [
            { id: 16, name: 'Moto X3M', description: 'Extreme bike racing', rating: 4.8, players: '600K+', image: '🏍️', url: 'https://poki.com/en/g/moto-x3m' },
            { id: 17, name: 'Drift Hunters', description: 'Car drifting simulator', rating: 4.6, players: '450K+', image: '🏎️', url: 'https://poki.com/en/g/drift-hunters' },
            { id: 18, name: 'Hill Climb Racing', description: 'Physics-based driving', rating: 4.5, players: '350K+', image: '🚗', url: 'https://poki.com/en/g/hill-climb-racing' }
        ],
        strategy: [
            { id: 19, name: 'Chess.com', description: 'Online chess battles', rating: 4.9, players: '2M+', image: '♟️', url: 'https://poki.com/en/g/chess-com' },
            { id: 20, name: 'Bloons TD 6', description: 'Tower defense strategy', rating: 4.7, players: '500K+', image: '🎈', url: 'https://poki.com/en/g/bloons-tower-defense' },
            { id: 21, name: 'Age of War', description: 'Evolution strategy game', rating: 4.6, players: '300K+', image: '⚔️', url: 'https://poki.com/en/g/age-of-war' }
        ]
    };

    const handleGameClick = (gameUrl) => {
        window.open(gameUrl, '_blank', 'noopener,noreferrer');
    };

    const currentGames = games[selectedCategory] || games.popular;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <FontAwesomeIcon icon={faGamepad} className="text-2xl text-blue-600 dark:text-blue-400" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Games Hub</h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Play the best games online for free</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                            aria-label="Close games modal"
                        >
                            ✖
                        </button>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                        {gameCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    selectedCategory === category.id
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                <FontAwesomeIcon icon={category.icon} className="text-sm" />
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Games Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentGames.map((game) => (
                            <div
                                key={game.id}
                                onClick={() => handleGameClick(game.url)}
                                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-200 dark:border-gray-600"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-4xl">{game.image}</div>
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <FontAwesomeIcon icon={faStar} className="text-sm" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{game.rating}</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {game.name}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    {game.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                                        <FontAwesomeIcon icon={faUsers} className="text-xs" />
                                        <span className="text-xs">{game.players}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                                        <span className="text-sm font-medium">Play Now</span>
                                        <span className="text-sm">→</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-b-xl border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <FontAwesomeIcon icon={faCrown} className="text-yellow-500" />
                            <span className="text-sm">Powered by Poki - Premium Gaming Platform</span>
                        </div>
                        <a 
                            href="https://poki.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                            Visit Poki →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

Games.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default Games;