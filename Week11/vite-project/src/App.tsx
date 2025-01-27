import { Route, Routes, BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import FrontPage from "./components/FrontPage"

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/saved" element={<div></div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
