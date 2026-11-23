
import './App.css'

import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <Hero />
      
      <Footer />
    </SmoothScroll>
  )
}

export default App
