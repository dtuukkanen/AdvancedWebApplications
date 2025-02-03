import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Book from './components/Book';
import './App.css'
import Header from './components/Header';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/book/:name" element={<Book />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
