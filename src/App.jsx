import { useState } from 'react'
import Footer from './Components/Footer'
import Nav from './Components/Nav'
import News from './Components/News'


function App() {
  const [selectedCategory, setSelectedCategory] = useState('general')

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  return (
    <>
      <Nav onCategorySelect={handleCategorySelect}/>
      <News category={selectedCategory}/>
      <Footer/>
    </>
  )
}

export default App
