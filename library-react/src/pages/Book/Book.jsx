import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { FavoritesContext } from '../../contexts/FavoritesContext.js'
import { getBook } from '../../api/books.js'
import { formatBook } from '../../api/formatBook.js'
import styles from './Book.module.css'

// Les résumés contiennent parfois du HTML (<p>, <b>...) : on l'enlève
function enleverHtml(texte) {
  return texte.replace(/<[^>]*>/g, ' ')
}

export default function Book() {
  const { id } = useParams() // l'identifiant dans l'adresse /books/:id
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

  const { favorites, toggleFavorite } = useContext(FavoritesContext)

  // 1. Chargement en cours
  if (loading) {
    return (
      <main className={styles.page}>
        <p>Chargement du livre…</p>
      </main>
    )
  }

  // 2. Erreur
  if (error) {
    return (
      <main className={styles.page}>
        <p role="alert">{error}</p>
        <Link to="/">Retour à la bibliothèque</Link>
      </main>
    )
  }

  // 3. Livre introuvable
  if (!book) {
    return (
      <main className={styles.page}>
        <p>Aucun livre ne correspond à cet identifiant.</p>
        <Link to="/">Retour à la bibliothèque</Link>
      </main>
    )
  }

  // 4. Le livre est chargé : on prépare quelques valeurs
  const isFavorite = favorites.includes(book.id)

  let summary = 'Aucun résumé disponible pour ce livre.'
  if (book.description) {
    summary = enleverHtml(book.description)
  }

  let language = 'Langue inconnue'
  if (book.language) {
    language = book.language.toUpperCase()
  }

  let genre = 'Genre inconnu'
  if (book.categories.length > 0) {
    genre = book.categories.join(', ')
  }

  return (
    <main className={styles.page}>
      <article className={styles.bookDetail}>
        <div className={styles.bookSidebar}>
          <img
            className={styles.detailCover}
            src={book.cover}
            alt={'Couverture de ' + book.title}
          />
          <div className={styles.bookActions}>
            <button
              className={[styles.bookAction, styles.primary].join(' ')}
              type="button"
              onClick={() => toggleFavorite(book.id)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {isFavorite ? 'favorite' : 'add_circle'}
              </span>
              {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>
            <a className={styles.bookAction} href="#resume">
              <span className="material-symbols-outlined" aria-hidden="true">
                menu_book
              </span>
              Lire le résumé
            </a>
          </div>
        </div>

        <div className={styles.bookInformation}>
          <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
            <ol>
              <li><Link to="/">Bibliothèque</Link></li>
              <li aria-current="page">{book.title}</li>
            </ol>
          </nav>

          <h1>{book.title}</h1>
          <p className={styles.detailAuthor}>{book.authors.join(', ')}</p>

          <dl className={styles.detailMetadata}>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                  calendar_today
                </span>
                <span className={styles.visuallyHidden}>Première publication</span>
              </dt>
              <dd>{book.publishedDate || 'Date inconnue'}</dd>
            </div>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                  translate
                </span>
                <span className={styles.visuallyHidden}>Langue originale</span>
              </dt>
              <dd>{language}</dd>
            </div>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                  auto_stories
                </span>
                <span className={styles.visuallyHidden}>Genre</span>
              </dt>
              <dd>{genre}</dd>
            </div>
          </dl>

          <section className={styles.bookSummary} id="resume">
            <h2 className={styles.visuallyHidden}>Présentation du livre</h2>
            <p>{summary}</p>
          </section>
        </div>
      </article>
    </main>
  )
}
