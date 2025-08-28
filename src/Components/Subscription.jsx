import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheck, faTimes, faBell, faNewspaper, faMobile, faGift, faCrown, faHeart } from '@fortawesome/free-solid-svg-icons';

const Subscription = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('free');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const subscriptionPlans = [
        {
            id: 'free',
            name: 'Free Newsletter',
            price: 'Free',
            description: 'Stay updated with daily news digest',
            features: [
                'Daily news digest',
                'Breaking news alerts',
                'Weekly newsletter',
                'Basic categories'
            ],
            icon: faNewspaper,
            color: 'blue'
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '$9.99/month',
            description: 'Get exclusive content and ad-free experience',
            features: [
                'All free features',
                'Ad-free reading',
                'Exclusive articles',
                'Premium newsletters',
                'Early access to news',
                'Mobile app access'
            ],
            icon: faCrown,
            color: 'gold',
            popular: true
        },
        {
            id: 'pro',
            name: 'Professional',
            price: '$19.99/month',
            description: 'For professionals who need comprehensive news coverage',
            features: [
                'All premium features',
                'Market analysis',
                'Industry reports',
                'Custom news feeds',
                'API access',
                'Priority support'
            ],
            icon: faHeart,
            color: 'purple'
        }
    ];

    const newsTopics = [
        { id: 'general', name: 'General News', icon: faNewspaper },
        { id: 'business', name: 'Business', icon: faCrown },
        { id: 'technology', name: 'Technology', icon: faMobile },
        { id: 'sports', name: 'Sports', icon: faHeart },
        { id: 'entertainment', name: 'Entertainment', icon: faGift },
        { id: 'health', name: 'Health', icon: faCheck },
        { id: 'science', name: 'Science', icon: faBell },
        { id: 'politics', name: 'Politics', icon: faEnvelope }
    ];

    const handleTopicToggle = (topicId) => {
        setSelectedTopics(prev => 
            prev.includes(topicId) 
                ? prev.filter(id => id !== topicId)
                : [...prev, topicId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            
            // Auto close after success
            setTimeout(() => {
                onClose();
            }, 2000);
        }, 1500);
    };

    const getColorClasses = (color, isSelected = false) => {
        const colors = {
            blue: isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-200 hover:border-blue-400',
            gold: isSelected ? 'bg-yellow-500 text-white border-yellow-500' : 'border-yellow-200 hover:border-yellow-400',
            purple: isSelected ? 'bg-purple-600 text-white border-purple-600' : 'border-purple-200 hover:border-purple-400'
        };
        return colors[color] || colors.blue;
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
                    <div className="text-green-500 text-6xl mb-4">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Aboard!</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Thank you for subscribing to NewsMela. You&apos;ll receive your first newsletter soon!
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Redirecting...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-blue-600 dark:text-blue-400" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscribe to NewsMela</h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Stay informed with the latest news and updates</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                            aria-label="Close subscription modal"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Subscription Plans */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Your Plan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {subscriptionPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                                        getColorClasses(plan.color, selectedPlan === plan.id)
                                    } ${selectedPlan !== plan.id ? 'bg-white dark:bg-gray-700' : ''}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="text-center mb-4">
                                        <FontAwesomeIcon 
                                            icon={plan.icon} 
                                            className={`text-3xl mb-2 ${
                                                selectedPlan === plan.id ? 'text-white' : `text-${plan.color}-500`
                                            }`} 
                                        />
                                        <h4 className={`font-bold text-lg ${
                                            selectedPlan === plan.id ? 'text-white' : 'text-gray-900 dark:text-white'
                                        }`}>
                                            {plan.name}
                                        </h4>
                                        <p className={`text-2xl font-bold ${
                                            selectedPlan === plan.id ? 'text-white' : 'text-gray-900 dark:text-white'
                                        }`}>
                                            {plan.price}
                                        </p>
                                        <p className={`text-sm mt-1 ${
                                            selectedPlan === plan.id ? 'text-white opacity-90' : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                            {plan.description}
                                        </p>
                                    </div>
                                    
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className={`flex items-center space-x-2 text-sm ${
                                                selectedPlan === plan.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <FontAwesomeIcon 
                                icon={faEnvelope} 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                            />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>

                    {/* News Topics */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Your Interests</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {newsTopics.map((topic) => (
                                <button
                                    key={topic.id}
                                    type="button"
                                    onClick={() => handleTopicToggle(topic.id)}
                                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                                        selectedTopics.includes(topic.id)
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={topic.icon} className="text-sm" />
                                    <span className="text-sm font-medium">{topic.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            By subscribing, you agree to our Terms of Service and Privacy Policy.
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || !email.trim()}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    <span>Subscribing...</span>
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faBell} />
                                    <span>Subscribe Now</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

Subscription.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default Subscription;