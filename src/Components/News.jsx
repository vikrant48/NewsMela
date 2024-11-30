import React, { useState, useEffect } from 'react'
import Card from './Card'
import Weather from './Weather';
import Newspaper from './NewsPaper';
import Nav from './Nav';
import Footer from './Footer'



const News = () => {
  const [newsData, setnewsData] = useState(null);
  const [search, setsearch] = useState("Search news");

  const NEWS_API_KEY1 = 'f36c2bdbc4114e48861a0c424f4a1363';
  const NEWS_API_KEY2 = '80e6b3ba365b40e1a5934da3791a5215';

  const today = new Date().toISOString().split('T')[0];
  // console.log(today); // Output: 'YYYY-MM-DD'

  const getData = async () => {
    try {
      const responce = await fetch(`https://newsapi.org/v2/everything?q=${search}&from=2024-11-15&to=${today}&sortBy=publishedAt&apiKey=${NEWS_API_KEY1}`)
      const jsonData = await responce.json();
      // console.log(jsonData);
      setnewsData(jsonData.articles)
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }
  useEffect(() => {
    getData()
  }, [search])

  const handleinput = (e) => {
    setsearch(e.target.value)

  }
  const userInput = (e) => {
    setsearch(e.target.value)

  }

  return (
    <>
      <Nav />
      <div>
        <div className="searchnews">
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search news"
              value={search}
              onChange={handleinput}
            />
            <button className="srchbtn" onClick={getData}>🔍</button>
          </div>

          <div className="catogarybtn">
            <button onClick={userInput} value='India'>India</button>
            <button onClick={userInput} value='U.S.'>U.S.</button>
            <button onClick={userInput} value='Sport'>Sports</button>
            <button onClick={userInput} value='Politics'>Politics</button>
            <button onClick={userInput} value='Entertainment'>Entertainment</button>
            <button onClick={userInput} value='International'>International</button>
            <button onClick={userInput} value='Fitness'>Fitness</button>
            <button onClick={userInput} value='Business'>Business</button>
            <button onClick={userInput} value='World'>World</button>
            <button onClick={userInput} value='Arts'>Arts</button>
            <button onClick={userInput} value='AI'>AI</button>
          </div>
        </div>

        <div className="news-weather-container">
          <div className="newspaper-section">
            <Newspaper />
          </div>
          <div className="weather-section">
            <Weather />
          </div>
        </div>
        <div>
          {newsData ? <Card data={newsData} /> : null}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default News
