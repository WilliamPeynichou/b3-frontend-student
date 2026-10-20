import { useEffect, useState } from 'react'
import { getBook } from '../api/books.js'
import { formatBook } from '../api/formatBook.js'

// Charge un livre à partir de son identifiant.
// Retourne : le livre, "loading" (en cours) et "error" (message d'erreur).
export default function useBook(id) {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Si l'id change pendant le chargement, on ignore l'ancienne réponse
    let ignore = false

    async function loadBook() {
      setLoading(true)
      setError('')
      setBook(null)

      try {
        const data = await getBook(id)
        if (ignore) return

        if (data) {
          setBook(formatBook(data))
        }
      } catch (err) {
        if (ignore) return
        setError(err.message)
      }

      if (!ignore) {
        setLoading(false)
      }
    }

    loadBook()

    // Nettoyage : appelé avant le prochain effet ou quand on quitte la page
    return () => {
      ignore = true
    }
  }, [id])

  return { book, loading, error }
}
