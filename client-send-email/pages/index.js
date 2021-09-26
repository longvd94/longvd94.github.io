import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import getConfig from 'next/config';

import Input from '../components/Form/Input';
import Textarea from '../components/Form/Textarea';
import Button from '../components/Form/Button';
import LoadingLock from '../components/Loading/LoadingLock';

import randomKey from '../utils/randomKey';
import trim from '../utils/trim';

import { 
  validAttachmentFileInput, 
  validBodyMessageInput, 
  validEmailInput, 
  validNameInput, 
  validRecipientsInput, 
  validSubjectInput 
} from '../helpers/forms';
import { request } from '../helpers/request';

import styles from '../styles/Home.module.css';

const { publicRuntimeConfig } = getConfig();

export default function Home() {
  const submitSuccessLabelTimeout = useRef();

  const [mounted, setMounted] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitError, setSubmitError] = useState({});
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const inputNames = useMemo(() => ['sender_name', 'sender_email', 'recipients', 'subject', 'message', 'attachment'], []);
  const inputTypes = useMemo(() => ['text', 'email', 'text', 'text', 'textarea', 'file'], []);
  const inputLabels = useMemo(() => ['Sender Name', 'Sender Email', 'Recipients', 'Subject', 'Message', 'Attachment'], []);
  const inputPlaceholders = useMemo(() => ['Enter sender name...', 'Enter sender email', 'Enter recipients', 'Enter Subject', 'Enter Message'], []);
  const inputIds = useMemo(() => {   
    const _inputIds = [];
    const inputNamesLength = inputNames.length;
    for (let i = 0; i < inputNamesLength; i++) {
      const inputId = randomKey(7);
      _inputIds.push(inputId);
    }
    return _inputIds;
  }, [mounted]);

  const resetForm = useCallback(() => {
    setFormValues({});
    setFormErrors({});
    setSubmitError({});
  }, []);

  const submitHandler = useCallback(async (e) => {
    e.preventDefault();

    if (isSubmit) {
      return false;
    }
    
    const errors = {};
    const submitFormData = new FormData();
     
    const { 
      value: senderName,       
      error_message: senderNameErrorMessage 
    } = validNameInput({ value: trim(formValues.sender_name), name: 'Sender Name' });

    const { 
      value: senderEmail, 
      error_message: senderEmailErrorMessage 
    } = validEmailInput({ value: trim(formValues.sender_email), name: 'Sender Email' });

    const {
      value: recipients,
      error_message: recipientsErrorMessage
    } = validRecipientsInput({ value: trim(formValues.recipients), name: 'Recipients' });

    const { 
      value: subject, 
      error_message: subjectErrorMessage 
    } = validSubjectInput({ value: trim(formValues.subject), name: 'Subject' });
    
    const { 
      value: message, 
      error_message: messageErrorMessage 
    } = validBodyMessageInput({ value: trim(formValues.message), name: 'Message' });
    
    const { 
      value: attachment, 
      error_message: attachmentErrorMessage 
    } = validAttachmentFileInput({ value: formValues.attachment, name: 'Attachment' });

    if (senderNameErrorMessage) {
      errors.sender_name = senderNameErrorMessage;
    } else {
      submitFormData.append('sender_name', senderName);
    }

    if (senderEmailErrorMessage) {
      errors.sender_email = senderEmailErrorMessage;
    } else {
      submitFormData.append('sender_email', senderEmail);     
    }

    if (recipientsErrorMessage) {
      errors.recipients = recipientsErrorMessage;
    } else {
      submitFormData.append('recipients', recipients);           
    }

    if (subjectErrorMessage) {
      errors.subject = subjectErrorMessage;
    } else {
      submitFormData.append('subject', subject);  
    }

    if (messageErrorMessage) {
      errors.message = messageErrorMessage;
    } else if (message) {
      submitFormData.append('message', message);       
    }

    if (attachmentErrorMessage) {
      errors.attachment = attachmentErrorMessage;
    } else if (attachment) {          
      const attachmentInputIdx = inputNames.indexOf('attachment');           
      const attachmentInputElem = document.getElementById(inputIds[attachmentInputIdx]);      
      const attachmentFile = attachmentInputElem.files[0];      
      submitFormData.append('attachment', attachmentFile);     
    }

    setFormErrors(errors);

    if (!Object.keys(errors).length) {
      setIsSubmit(true);      
      try {
        await request(`${publicRuntimeConfig.expressMailHost}/api/send`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            ContentType: 'multipart/form-data',            
          },
          body: submitFormData
        });        
        resetForm();
        setIsSubmit(false);
        setIsSubmitSuccess(true);       
        submitSuccessLabelTimeout.current = setTimeout(() => {
          setIsSubmitSuccess(false);
        }, 10000);
      } catch (err) {
        setIsSubmit(false);
        setSubmitError(err);
      }      
    }

    return false;

  }, [isSubmit, formValues, inputIds]);


  const changeInputHandler = useCallback((e) => {
    const inputName = e.target.name;
    const inputVal = e.target.value;

    setIsSubmitSuccess(false);

    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [inputName]: inputVal,
    }));

    setFormErrors(prevFormErrors => ({
      ...prevFormErrors,
      [inputName]: '',
    }))
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSubmitSuccess && submitSuccessLabelTimeout.current) {
      setIsSubmitSuccess(false);
      clearTimeout(submitSuccessLabelTimeout.current);
    }
    return () => {
      clearTimeout(submitSuccessLabelTimeout);
    };
  }, [formValues]);
  
  const formInputs = useMemo(() => {
    const inputs = [];

    for (let i = 0; i < inputNames.length; i++) {
      const inputName = inputNames[i];
      const inputId = inputIds[i];
      const inputPlaceholder = inputPlaceholders[i] || '';
      const inputType = inputTypes[i] || 'text';
      const inputLabel = inputLabels[i] || '';
      inputs.push({
        id: inputId,
        type: inputType,
        label: inputLabel,        
        placeholder: inputPlaceholder,
        name: inputName,
        value: formValues[inputName],
        error: formErrors[inputName],
        onChange: changeInputHandler,
      })
    } 

    return inputs;
  }, [inputIds, formValues, formErrors]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Send email project</title>
        <meta name="description" content="Send email project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>  
        {isSubmit && (
          <LoadingLock />
        )}

        <p className={styles.description}>
          Send Information
        </p>
        {submitError && submitError.message && (
          <p className={styles['server-err']}>&#10006;  {submitError.message}</p>
        )}
        {isSubmitSuccess && (
          <p className={styles['server-success']}>&#10004;  Successfully</p>
        )}
        <form onSubmit={submitHandler}>        
          {formInputs.map((inputProps) => inputProps.type === 'textarea' ? (            
            <Textarea key={inputProps.id} {...inputProps} />
          ) : (
            <Input key={inputProps.id} {...inputProps} />
          ))}   
          <Button>Send</Button>
        </form>
      </main>
    </div>
  )
} 
