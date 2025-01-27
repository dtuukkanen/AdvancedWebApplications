import { Route, Routes, BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import FrontPage from "./components/FrontPage"
import { useJokes } from "./hooks/useJokes"
import SavedPage from "./components/SavedPage"

function App() {
  const { savedJokes, saveJoke, deleteJoke } = useJokes()

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<FrontPage saveJoke={saveJoke}/>} />
          <Route path="/saved" element={<SavedPage savedJokes={savedJokes} deleteJoke={deleteJoke}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
