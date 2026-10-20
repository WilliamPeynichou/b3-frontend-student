const API_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

// Google répond parfois "503" (service occupé) : on réessaie jusqu'à 3 fois
async function fetchAvecReessai(url) {
  let response = await fetch(url)

  for (let essai = 1; essai < 3 && response.status === 503; essai++) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    response = await fetch(url)
  }

  return response
}

// Cherche des livres à partir d'un texte
export async function searchBooks(query) {
  const params = new URLSearchParams({
    q: query,
    key: API_KEY,
    maxResults: 12,
  })

  const response = await fetchAvecReessai(`${API_URL}?${params}`)

  if (!response.ok) {
    throw new Error('La recherche a échoué (erreur ' + response.status + ')')
  }

  return response.json()
}

// Récupère un seul livre grâce à son identifiant
export async function getBook(id) {
  const params = new URLSearchParams({ key: API_KEY })

  const response = await fetchAvecReessai(`${API_URL}/${id}?${params}`)

  // 404 = ce livre n'existe pas
  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Le livre n’a pas pu être chargé (erreur ' + response.status + ')')
  }

  return response.json()
}
