import { useState } from "react";

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true
  });
  const [preferences, setPreferences] = useState({
    categories: [],
    language: 'English'
  });

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone')
    };
    setProfileData(updatedProfile);
    alert('Profile updated successfully!');
  };

  // Handle settings change
  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle preferences change
  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Account</h2>
        <div className="w-20 h-20 mx-auto mb-4">
          <img src="/api/placeholder/80/80" alt="User Avatar" className="w-full h-full rounded-full object-cover border-4 border-blue-500" />
        </div>
      </div>
      
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button 
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'profile' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'settings' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button 
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'preferences' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
      </div>
      
      <div className="min-h-[300px]">
        {activeTab === 'profile' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
            <form className="space-y-4" onSubmit={handleProfileSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</label>
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifications}
                  onChange={() => handleSettingChange('emailNotifications')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Push Notifications</label>
                <input 
                  type="checkbox" 
                  checked={settings.pushNotifications}
                  onChange={() => handleSettingChange('pushNotifications')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Newsletter Subscription</label>
                <input 
                  type="checkbox" 
                  checked={settings.newsletter}
                  onChange={() => handleSettingChange('newsletter')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'preferences' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">News Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Categories</label>
                <select 
                  multiple 
                  value={preferences.categories}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                    handlePreferenceChange('categories', selectedOptions);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 h-32"
                >
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Business">Business</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                <select 
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
