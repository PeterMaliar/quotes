import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import Header from './Header';

const Layout = () => {
  return <div className={styles.layout}>
     <Header />
     <main>
        <Outlet />
     </main>
  </div>;
};

export default Layout;
