import React from 'react';

import Group from './Group';
import Notier from './Notier';

import styles from './Form.module.css';

function Input({ id='', type = 'text', error = '', value = '', name = '', label = '', placeholder = '', onChange = () => {} }) {
    return (
        <Group>
            {label && id && (
                <label className={styles['input-label']} htmlFor={id}>{label}</label>
            )}
            <input className={styles.input} id={id} type={type} value={value} name={name} placeholder={placeholder} onChange={onChange} />
            {error && (<Notier>{error}</Notier>)}
        </Group>
    );
}

export default Input;