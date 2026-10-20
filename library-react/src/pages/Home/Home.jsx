import { useEffect, useRef, useState } from 'react'
import BookCard from '../../components/BookCard/BookCard.jsx'
import { searchBooks } from '../../api/books.js'
import { formatBook } from '../../api/formatBook.js'
import styles from './Home.module.css'

const RECHERCHE_PAR_DEFAUT = 'subject:fiction'

export default function Home() {
  // --- Le formulaire ---
  const [search, setSearch] = useState('') // ce que l'utilisateur tape
  const [query, setQuery] = useState(RECHERCHE_PAR_DEFAUT) // la recherche validée
  const inputRef = useRef(null) // pour accéder au champ

  // --- Les résultats ---
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Quand on valide le formulaire (Entrée ou bouton)
  function handleSubmit(event) {
    event.preventDefault() // empêche le rechargement de la page

    const texte = search.trim() // enlève les espaces au début et à la fin
    if (texte === '') {
      setQuery(RECHERCHE_PAR_DEFAUT)
    } else {
      setQuery(texte)
    }
  }

  // Quand on clique sur « Effacer »
  function handleClear() {
    setSearch('')
    inputRef.current.focus() // remet le curseur dans le champ
  }

  // Charge les livres à l'ouverture et à chaque nouvelle recherche validée
  useEffect(() => {
    // Si la recherche change pendant le chargement, on ignore l'ancienne réponse
    let ignore = false

    async function loadBooks() {
      setLoading(true)
      setError('')

      try {
        const data = await searchBooks(query)
        if (ignore) return

        // data.items peut ne pas exister : dans ce cas, liste vide
        const items = data.items || []
        setBooks(items.map(formatBook))
      } catch (err) {
        if (ignore) return
        setBooks([])
        setError(err.message)
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

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Bibliothèque</h1>
      <p className={styles.description}>
        Bienvenue dans notre bibliothèque. Découvrez notre{' '}
        <strong>sélection de romans d’aventure</strong> et consultez la fiche
        d’un livre pour en savoir plus. Cette sélection vous invite à explorer
        des récits d’aventure et des univers imaginaires.{' '}
        <em>Quel sera votre prochain voyage ?</em>
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.searchField}>
          <input
            ref={inputRef}
            type="search"
            name="q"
            id="book-name"
            aria-label="Rechercher un livre"
            placeholder="Rechercher un titre, un auteur..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className={styles.clearButton} type="button" onClick={handleClear}>
            Effacer
          </button>
          <button type="submit" aria-label="Rechercher">
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>
        </div>
      </form>

      <p className={styles.submitted}>Recherche validée : {query}</p>

      <section className={styles.catalogue}>
        <h2>Les livres de la bibliothèque</h2>

        {loading && <p className={styles.status}>Chargement des livres…</p>}

        {error && (
          <p className={styles.status} role="alert">
            {error}
          </p>
        )}

        {!loading && !error && books.length === 0 && (
          <p className={styles.status}>Aucun résultat</p>
        )}

        <ul className={styles.bookList}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ul>
      </section>
    </main>
  )
}
