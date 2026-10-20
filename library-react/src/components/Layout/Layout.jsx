import { Outlet } from 'react-router'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'

// Le layout : le header et le footer sont communs à toutes les pages.
// <Outlet /> est l'endroit où s'affiche la page courante (Home ou Book).
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
