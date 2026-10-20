import { useEffect, useState } from 'react'
import { searchBooks } from '../api/books.js'
import { formatBook } from '../api/formatBook.js'

// Charge la liste des livres pour une recherche (query).
// Retourne : books (la liste), loading (en cours ?) et error (message d'erreur).
export default function useBooks(query) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Si la recherche change pendant le chargement, on ignore l'ancienne réponse
    let ignore = false

    async function loadBooks() {
      setLoading(true)
      setError('') // on efface l'erreur précédente

      try {
        const data = await searchBooks(query)
        if (ignore) return

        // data.items peut ne pas exister : dans ce cas, liste vide
        const items = data.items || []
        setBooks(items.map(formatBook))
      } catch (err) {
        if (ignore) return
        setBooks([])

        if (err instanceof TypeError) {
          // fetch lance une TypeError quand il n'y a pas de réseau
          setError('Impossible de joindre Google Books. Vérifie ta connexion.')
        } else {
          setError(err.message)
        }
      }

      if (!ignore) {
        setLoading(false)
      }
    }

    loadBooks()

    // Nettoyage : appelé avant le prochain effet
    return () => {
      ignore = true
    }
  }, [query])

  return { books, loading, error }
}
