import React, { useState, useEffect } from 'react'
import Card from './Card'
import Game from './Game';
import '../assets/News.css'

const News = () => {
  const [newsData, setnewsData] = useState(null);
  const [search, setsearch] = useState("Search news");

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const date = new Date()
  const today = date.toISOString().split('T')[0]
  // console.log(today); // Output: 'YYYY-MM-DD'

  const pastDate = new Date(date);
  pastDate.setDate(date.getDate() - 25);

  const fromdate = pastDate.toISOString().split('T')[0];

  const getData = async () => {
    try {
      const responce = await fetch(`https://newsapi.org/v2/everything?q=${search}&from=${fromdate}&to=${today}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`)
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
        <div>
          {newsData ? (
            <Card data={newsData} />
          ) : (
            <>
              <div className="news-api-error">
                <h3>Oops! The news API is not working. Try playing a game !! </h3>
              </div>
              <div className="game-container">
                <Game />
              </div>
            </>
          )}
        </div>
      </div>
  )
}

export default News
