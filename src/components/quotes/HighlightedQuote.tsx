import { FC } from 'react';
import styles from './HighlightedQuote.module.scss';

interface HighlightedQuoteProps {
   author: string,
   text: string
}

const HighlightedQuote: FC<HighlightedQuoteProps> = ({author, text}) => {
   return <figure className={styles.quote}>
      <p>{text}</p>
      <figcaption>{author}</figcaption>
   </figure>;
};

export default HighlightedQuote;
