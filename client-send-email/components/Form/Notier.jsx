import React from 'react';

import styles from './Form.module.css';

function Notier({ children }) {
    return (<p className={styles.notier}>{children}</p>);
}

export default Notier;