import { Link } from 'react-router'
import styles from './BookCard.module.css'

// Une carte de livre. Elle reçoit le livre grâce aux props.
export default function BookCard({ book }) {
  // "1851-05-12" -> "1851"
  const year = book.publishedDate.slice(0, 4)

  return (
    <li>
      <Link className={styles.bookCard} to={'/books/' + book.id}>
        <img className={styles.bookCover} src={book.cover} alt="" />
        <div className={styles.bookContent}>
          <h3 className={styles.bookTitle}>{book.title}</h3>
          <p className={styles.bookMeta}>
            <span className={styles.bookAuthor}>{book.authors.join(', ')}</span>
            {year && <time dateTime={book.publishedDate}>{year}</time>}
          </p>
        </div>
      </Link>
    </li>
  )
}
