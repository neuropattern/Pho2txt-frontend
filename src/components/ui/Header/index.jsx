import React from 'react';

import styles from './styles.module.scss';

const Header = React.memo(({}) => {
  return (
    <div className={styles.header}>
      <span className={styles.title}>Pho to TXT</span>
      <ul className={styles.description}>
        <li>Chose image file</li>
        <li>Chose service type</li>
        <li>Chose binarization type</li>
        <li>Press button to upload image</li>
      </ul>
    </div>
  );
});

export default Header;
