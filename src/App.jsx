import CurrencyConvertor from './Components/CurrencyConvertor'
import Footer from './Components/Footer'
import Nav from './Components/Nav'
import News from './Components/News'
import Newspaper from './Components/NewsPaper'
import Weather from './Components/Weather'


function App() {

  return (
    <>
      <Nav/>
      <div className="news-weather-container">
          <div className="newspaper-section">
            <Newspaper />
          </div>
          <div className="currency-section">
            <CurrencyConvertor />
          </div>
          <div className="weather-section">
            <Weather />
          </div>
        </div>
      <News/>
      <Footer/>
    </>
  )
}

export default App
