import { useState } from 'react'
import { FavoritesContext } from './FavoritesContext.js'

export default function FavoritesProvider({ children }) {
  // Les favoris restent en mémoire pendant la navigation
  const [favorites, setFavorites] = useState([])

  // Ajoute l'id s'il n'y est pas, le retire sinon
  function toggleFavorite(id) {
    setFavorites((avant) => {
      if (avant.includes(id)) {
        return avant.filter((favoriId) => favoriId !== id)
      }
      return [...avant, id]
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
