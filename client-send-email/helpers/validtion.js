import isString from '../utils/isString';
import isNumber from '../utils/isNumber';
import trim from '../utils/trim';

export const validString = (props) => {    
    if (props.error_message) {
        return props;
    }

    if (props.value && !isString(props.value)) {
        return { ...props, error_message: `${props.name || 'Text'} is not valid` };        
    }
    return props;
}

export const validContainScriptAtk = (props) => {
    if (props.error_message) {
        return props;
    }

    if (props.value && props.value.match(/<script[\s\S]*?>[\s\S]*?<\/script>/gi)) {
        return { ...props, error_message: `${props.name || 'Text'} is contain characters not allowed` };   
    }

    return props;
}

export const isRequired = (props) => {
    if (props.error_message) {
        return props;
    }

    if (!props.value) {
        return { ...props, error_message: `${props.name || 'Text'} is required` };         
    }    
    return props;
}

export const validMaxChars = (numMaxChars) => {
    return function(props) {
        if (!numMaxChars || !isNumber(numMaxChars)) {
            throw Error(`numMaxChars is a number`);
        }

        if (props.error_message) {
            return props;
        }

        if (props.value && props.value.length > numMaxChars) {
            return { ...props, error_message: `${props.name || 'Text'} maximum is ${numMaxChars} characters` };   
        }

        return props;
    }
    
}

export const validEmail = (props) => {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (props.error_message) {
        return props;
    }

   
    if (props.value && !emailReg.test(props.value)) {
        return { ...props, error_message: `${props.name || 'Email'} is not valid` };         
    }

    return props;
}

export const validRecipients = (props) => {
    if (props.error_message) {
        return props;
    }   
    
    const emails = props.value ? props.value.split(',') : [];
    const emailsLength = emails.length;

    if (!emailsLength) {
        return { ...props, error_message: `${props.name || 'Recipients'} is required` };
    }

    let recipients = [];
    let _props = props;

    for (let i = 0; i < emailsLength; i++) {
        const { value, error_message } = validEmail({ value: trim(emails[i]), name: trim(emails[i]) });       
        if (error_message) {
            _props = { ..._props, error_message };
            break;
        } else if (!value) {
            continue;
        } else {
            recipients.push(value);
        }
    }

    if (!recipients) {
        return { ...props, error_message: `${props.name || 'Recipients'} is required` };
    }

    return { ..._props, recipients };
}

export const validExtFile = (props) => {
    if (props.error_message) {
        return props;
    }
    
    const ext = props.value ? props.value.match(/\.([^\.]+)$/)[1] : '';
    if (ext && !ext.match(/jpg|png/gi)) {
        return { ...props, error_message: `${props.name || 'File'} is not allowed` }
    }

    return props;
}