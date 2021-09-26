import pipe from '../utils/pipe';

import { 
    isRequired, 
    validContainScriptAtk, 
    validEmail, 
    validExtFile, 
    validMaxChars, 
    validRecipients, 
    validString,
  } from './validtion';

export const validNameInput = pipe(
    isRequired, 
    validString, 
    validMaxChars(100)
);

export const validEmailInput = pipe(
    isRequired, 
    validString, 
    validEmail
);

export const validRecipientsInput = pipe(
    isRequired, 
    validString, 
    validRecipients
);

export const validSubjectInput = pipe(
    isRequired,
    validString,
    validMaxChars(255),
)

export const validBodyMessageInput = validContainScriptAtk

export const validAttachmentFileInput = validExtFile