import React from 'react';

import styles from './styles.module.scss';

const Footer = React.memo(({}) => {
  return (
    <div className={styles.footer}>
      <span className={styles.title}>Need help?</span>
      <a
        className={styles.link}
        href="mailto:pho2text@gmail.com"
      >
        {'Contact us'}
      </a>
    </div>
  );
});

export default Footer;
