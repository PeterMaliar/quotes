import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {

      const setActive = (props: {isActive: boolean}) =>{
         const {isActive} = props;
         return isActive ? `${styles.active}` : '';
      } 


   return <div className={styles.header}>
      <div className={styles.logo}>Greate Quotes</div>
      <nav>
         <ul>
            <li>
               <NavLink to={'/quotes'} className={setActive}>All Quotes</NavLink>
            </li>
            <li>
               <NavLink to={'/new-quote'} className={setActive}>Add a Quote</NavLink>
            </li>
         </ul>
      </nav>
   </div>;
};

export default Header;
