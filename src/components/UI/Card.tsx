import React, { FC, ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
   children: ReactNode
}

const Card: FC<CardProps> = ({children}) => {
  return <div className={styles.card}>
     {children}
  </div>;
};

export default Card;
