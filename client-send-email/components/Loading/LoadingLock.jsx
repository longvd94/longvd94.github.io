import React from 'react';
import Loading from './Loading';

import styles from './Loading.module.css';

function LoadingLock() {
    return (
        <div className={styles.overlay}>
            <div className={styles.content}>
                <Loading />
            </div>
        </div>
    );
}

export default LoadingLock;