import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyContainer from './components/MyContainer'
import About from './components/About'
import Header from './components/Header'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MyContainer />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
