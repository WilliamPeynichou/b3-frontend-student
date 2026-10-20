import { useEffect, useState } from 'react'
import { FavoritesContext } from './FavoritesContext.js'

// Lit les favoris sauvegardés dans le navigateur
function lireFavoris() {
  try {
    const texte = localStorage.getItem('favorites')
    const liste = JSON.parse(texte)

    // Si ce n'est pas une liste, on repart de zéro
    if (Array.isArray(liste)) {
      return liste
    }
    return []
  } catch {
    // Texte abîmé : on repart de zéro
    return []
  }
}

export default function FavoritesProvider({ children }) {
  // La liste des identifiants favoris
  const [favorites, setFavorites] = useState(lireFavoris)

  // À chaque changement, on sauvegarde
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

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
