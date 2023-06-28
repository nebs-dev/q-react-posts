import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import withLogging from '../hoc/withLogging';

const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        React Blog
      </Link>
    </header>
  );
};

const Header = withLogging(HeaderComponent);
export default Header;
