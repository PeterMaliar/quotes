import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { QuoteType } from '../../App';
import styles from './QuoteItem.module.scss';

interface QuoteItemProps {
   quote: QuoteType
}

const QuoteItem: FC<QuoteItemProps> = ({quote}) => {
   const {author, text, id} = quote;
   return <li className={styles.item}>
      <figure>
         <blockquote>
            <p>{text}</p>
         </blockquote>
         <figcaption>{author}</figcaption>
      </figure>
      <Link to={`${id}`} className={styles.btn}>View Fullscreen</Link>
   </li>;
};

export default QuoteItem;
