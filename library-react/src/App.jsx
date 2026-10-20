import { Route, Routes } from 'react-router'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import Book from './pages/Book/Book.jsx'

export default function App() {
  return (
    <Routes>
      {/* Toutes les pages sont affichées dans le layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<Book />} />
      </Route>
    </Routes>
  )
}
