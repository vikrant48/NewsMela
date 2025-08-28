import { useState } from 'react';

const newspapers = [
  { name: 'The Times of India', url: 'https://timesofindia.indiatimes.com/' },
  { name: 'The Hindu', url: 'https://www.thehindu.com/' },
  { name: 'BBC News', url: 'https://www.bbc.com/news' },
  { name: 'CNN', url: 'https://www.cnn.com/' },
  { name: 'Al Jazeera', url: 'https://www.aljazeera.com/' },
  { name: 'NDTV', url: 'https://www.ndtv.com/' },
  { name: 'Reuters', url: 'https://www.reuters.com/' },
];


const Newspaper = () => {
    const [selectedNewspaper, setSelectedNewspaper] = useState('');
  
    const handleSelection = (event) => {
      const selectedValue = event.target.value;
      setSelectedNewspaper(selectedValue);
  
      if (selectedValue) {
        window.open(selectedValue, '_blank'); // Opens in a new tab
      }
    };
  
    return (
      <div className="relative">
        {/* <h2>Select a Newspaper</h2> */}
        <select 
          onChange={handleSelection} 
          value={selectedNewspaper}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >

          <option value="">-- Select Newspaper --</option>
          {newspapers.map((paper, index) => (
            <option key={index} value={paper.url}>
              {paper.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  export default Newspaper;
  