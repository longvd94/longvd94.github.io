import React from 'react';

import styles from './Form.module.css';

function Group({ children }) {
    return (
        <div className={styles['input-field']}>{children}</div>
    );
}

export default Group;