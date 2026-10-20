import { useEffect, useState } from 'react'
import { getBook } from '../api/books.js'
import { formatBook } from '../api/formatBook.js'

// Charge un seul livre grâce à son identifiant.
// Retourne : book (null si introuvable), loading et error.
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

        // data vaut null si le livre n'existe pas
        if (data) {
          setBook(formatBook(data))
        }
      } catch (err) {
        if (ignore) return

        if (err instanceof TypeError) {
          setError('Impossible de joindre Google Books. Vérifie ta connexion.')
        } else {
          setError(err.message)
        }
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
