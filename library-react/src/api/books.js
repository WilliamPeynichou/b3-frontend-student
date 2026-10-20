const API_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

// Cherche des livres à partir d'un texte
export async function searchBooks(query) {
  const params = new URLSearchParams({
    q: query,
    key: API_KEY,
    maxResults: 12,
  })

  const response = await fetch(`${API_URL}?${params}`)

  if (!response.ok) {
    throw new Error('La recherche a échoué (erreur ' + response.status + ')')
  }

  return response.json()
}

// Récupère un seul livre grâce à son identifiant
export async function getBook(id) {
  const params = new URLSearchParams({ key: API_KEY })

  const response = await fetch(`${API_URL}/${id}?${params}`)

  // 404 = ce livre n'existe pas
  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Le livre n’a pas pu être chargé (erreur ' + response.status + ')')
  }

  return response.json()
}
