import { Route, Routes, BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import FrontPage from "./components/FrontPage"
import { useJokes } from "./hooks/useJokes"

function App() {
  const { savedJokes, saveJoke } = useJokes()

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<FrontPage saveJoke={saveJoke}/>} />
          <Route path="/saved" element={<div></div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
