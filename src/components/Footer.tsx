import React from 'react';
import styles from './Footer.module.scss';
import withLogging from '../hoc/withLogging';

const FooterComponent: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© {new Date().getFullYear()} React Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

const Footer = withLogging(FooterComponent);
export default Footer;
