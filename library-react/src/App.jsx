import { Route, Routes } from 'react-router'
import Header from './components/Header/Header.jsx'
import footerStyles from './components/Footer/Footer.module.css'
import Home from './pages/Home/Home.jsx'
import Book from './pages/Book/Book.jsx'

export default function App() {
  return (
    <>
      <Header />

      {/* Chaque adresse affiche une page différente */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<Book />} />
      </Routes>

      <footer className={footerStyles.footer}>
        <p>© 2026 Sup de Vinci — Bibliothèque pédagogique</p>
      </footer>
    </>
  )
}
