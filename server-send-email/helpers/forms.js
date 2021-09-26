const pipe = require('../utils/pipe');

const { 
    isRequired, 
    validContainScriptAtk, 
    validEmail, 
    validExtFile, 
    validMaxChars, 
    validRecipients, 
    validString,
  } = require('./validtion');

const validNameInput = pipe(
    isRequired, 
    validString, 
    validMaxChars(100)
);

const validEmailInput = pipe(
    isRequired, 
    validString, 
    validEmail
);

const validRecipientsInput = pipe(
    isRequired, 
    validString, 
    validRecipients
);

const validSubjectInput = pipe(
    isRequired,
    validString,
    validMaxChars(255),
)

const validBodyMessageInput = validContainScriptAtk

const validAttachmentFileInput = validExtFile

module.exports = {
    validNameInput,
    validEmailInput,
    validRecipientsInput,
    validSubjectInput,
    validBodyMessageInput,
    validAttachmentFileInput
};