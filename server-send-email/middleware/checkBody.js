const { 
    validNameInput, 
    validEmailInput, 
    validRecipientsInput, 
    validSubjectInput, 
    validBodyMessageInput, 
    validAttachmentFileInput 
} = require('../helpers/forms');
const responseder = require('../helpers/responseder');

function checkBody(req, res, next) {
    const { body } = req;
    
    const { error_message: senderNameError } = validNameInput({ value: body.sender_name, name: 'Sender Name' });
    const { error_message: senderEmailError } = validEmailInput({ value: body.sender_email, name: 'Sender Email' });
    const { error_message: recipientsError } = validRecipientsInput({ value: body.recipients, name: 'Recipients' });
    const { error_message: subjectError } = validSubjectInput({ value: body.subject, name: 'Subject' });
    const { error_message: messageError } = validBodyMessageInput({ value: body.message, name: 'Message' });
    const { error_message: attachmentError } = validAttachmentFileInput({ value: body.attachment, name: 'Attachment' });

    const errors = [];

    if (senderNameError) {
        errors.push(senderNameError);
    }

    if (senderEmailError) {
        errors.push(senderEmailError);
    }

    if (recipientsError) {
        errors.push(recipientsError);
    }

    if (subjectError) {
        errors.push(subjectError);
    }

    if (messageError) {
        errors.push(messageError);
    }

    if (attachmentError) {
        errors.push(attachmentError);
    }

    if (errors.length) {        
        return res.status(400).json(responseder.badRequest(errors[1]));        
    } 
        
    next();
       
}

module.exports = checkBody;
