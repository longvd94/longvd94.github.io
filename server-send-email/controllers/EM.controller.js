const { Buffer } = require('buffer');

const EMService = require('../services/EM.service');
const SMTPService = require('../services/SMTP.service');
const responseder = require('../helpers/responseder');
const { validRecipients } = require('../helpers/validtion');



module.exports = {    
    sendEmail: async function(req, res) {
        const { body, file } = req;               
        let attachment;
        let status = 0;
        let error_message = '';        
        const { recipients } = validRecipients({ value: body.recipients });

        if (file) {
            attachment = Buffer.from(file.buffer, 'binary').toString('base64');
        }    
        
        try {
            await SMTPService.senderSmtpEmail({ ...body, recipients });
            status = 1;            
        } catch (err) {
            console.error('SMTP err', err);
            error_message = err.message;
        }
        
        try {           
           const data = await EMService.send({ ...body, status, error_message, attachment });
           res.status(201).json(responseder.success('success', data));
        } catch (err) {   
            console.error('err log db', err.message);         
            res.status(503).json(responseder.unavailable());
        }        
    }
}; 