import { Link } from 'react-router-dom';
import styles from './NotFoundQuote.module.scss';

const NotFoundQuotes = () => {
  return <div className={styles['not-found']}>
     <p>No quotes found</p>
     <Link className='btn--flat' to={'/new-quote'}>Add new quote</Link>
  </div>;
};

export default NotFoundQuotes;
