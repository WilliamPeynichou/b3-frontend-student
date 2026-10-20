import { useContext } from 'react'
import { Link } from 'react-router'
import { FavoritesContext } from '../../contexts/FavoritesContext.js'
import styles from './Header.module.css'

export default function Header() {
  // On lit les favoris partagés par le contexte
  const { favorites } = useContext(FavoritesContext)

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to="/">Bibliothèque</Link></li>
          <li>Favoris : {favorites.length}</li>
        </ul>
      </nav>
    </header>
  )
}
