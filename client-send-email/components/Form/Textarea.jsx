import React from 'react';

import Group from './Group';
import Notier from './Notier';

import styles from './Form.module.css';

function Textarea({ id = '', error = '', value = '', name = '', label = '', placeholder = '', onChange = () => {} }) {
    return (
        <Group>
             {label && id && (
                <label className={styles['input-label']} htmlFor={id}>{label}</label>
            )}
            <textarea id={id} className={styles.textarea} name={name} placeholder={placeholder} value={value} onChange={onChange} />            
            {error && (<Notier>{error}</Notier>)}
        </Group>
    );
}

export default Textarea;