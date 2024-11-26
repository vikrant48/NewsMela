import React, { useState,useEffect } from 'react'
import Card from './Card'
import Weather from './Weather';
import Newspaper from './NewsPaper';


const News = () => {

  const [search, setsearch] = useState("India");
  const [newsData, setnewsData] = useState(null);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false); // State to control Weather modal

  const NEWS_API_KEY = 'f36c2bdbc4114e48861a0c424f4a1363';

  const today = new Date().toISOString().split('T')[0];
  console.log(today); // Output: 'YYYY-MM-DD'

  const getData = async()=>{
    try {
      const responce = await fetch(`https://newsapi.org/v2/everything?q=${search}&from=2024-10-12&to=${today}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`)
      const jsonData = await responce.json();
      // console.log(jsonData);
      setnewsData(jsonData.articles)
      // let dt = jsonData.articles.slice(0,10)
      // setNewsData(dt)
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }
  useEffect(()=>{
    getData()
  },[search])

  const handleinput = (e)=>{
    setsearch(e.target.value)

  }
  const userInput = (e)=>{
    setsearch(e.target.value)

  }

  const openWeatherModal = () => {
    setIsWeatherOpen(true);  // Open Weather modal
  };

  const closeWeatherModal = () => {
    setIsWeatherOpen(false); // Close Weather modal
  };

  return (
    <>
    <div>
      <nav>
        <div>
          <h1>NEWSMELA</h1>
        </div>
        <ul>
          <a href="https://www.indiatoday.in/india">All News</a>
          {/* <Newspaper/> */}
          <a href="https://www.ndtv.com/trends">Treandy</a>
        </ul>
        <div className="searchbar">
          <input type="text" placeholder='searchnews' value ={search} onChange={handleinput} />
          <button onClick={getData}>Search</button>
        </div>
      </nav>
      <div className="catogarybtn">
        <button onClick={userInput} value='sport'>Sports</button>
        <button onClick={userInput} value='politics'>Politics</button>
        <button onClick={userInput} value='entertainment'>Entertainment</button>
        <button onClick={userInput} value='international'>International</button>
        <button onClick={userInput} value='fitness'>Fitness</button>
      </div>
      {/* <div><Newspaper/></div> */}
      
      <div className='newstype'>
        <div className="inline-elements">
          <Newspaper/>
          <button onClick={openWeatherModal}>Cheak Weather Update</button> {/* Weather Button */}
        </div>
      </div>
      {/* Weather Modal */}
      {isWeatherOpen && (
          <div className="weatherModal">
            <div className="modalContent">
              <Weather />
              <button onClick={closeWeatherModal} className="closeModal">Close</button> {/* Close button */}
            </div>
          </div>
        )}
      <div>
        {newsData?  <Card data={newsData}/> : null}
      </div>
      <footer className='footerStyles'>
      <div className='footerContainer'>
        <div className='footerLeft'>
          <h3>NEWSMELA</h3>
          <p>Stay updated with the latest news from around the world.</p>
        </div>
        <div className='footerCenter'>
          <ul className='footerLinks'>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className='footerRight'>
          <p>&copy; 2024 NewsMela All rights reserved.</p>
          <p>Follow us on:</p>
          <div className='socialLinks'>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      </footer>
    </div>
   
    </>
  )
}

export default News
