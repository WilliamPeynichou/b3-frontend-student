import coverParDefaut from '../assets/moby-dick.png'

// Google renvoie un gros objet. On le transforme en objet simple :
// { id, title, authors, publishedDate, cover, language, description, categories }
export function formatBook(item) {
  const info = item.volumeInfo || {}

  // Titre
  let title = 'Titre inconnu'
  if (info.title) {
    title = info.title
  }

  // Auteurs (liste)
  let authors = ['Auteur inconnu']
  if (info.authors) {
    authors = info.authors
  }

  // Couverture : si elle manque, on met celle de Moby-Dick
  let cover = coverParDefaut
  if (info.imageLinks && info.imageLinks.thumbnail) {
    // Google donne parfois "http" : on passe en "https"
    cover = info.imageLinks.thumbnail.replace('http://', 'https://')
  }

  return {
    id: item.id,
    title: title,
    authors: authors,
    publishedDate: info.publishedDate || '',
    cover: cover,
    language: info.language || '',
    description: info.description || '',
    categories: info.categories || [],
  }
}
