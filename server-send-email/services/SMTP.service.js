const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SMTP_APIKEY;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();


async function senderSmtpEmail(data) {
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();    

    sendSmtpEmail.subject = data.subject;
    sendSmtpEmail.htmlContent = data.message || '';
    sendSmtpEmail.sender = { name: data.sender_name, email: data.sender_email };
    sendSmtpEmail.to = data.recipients.map((email) => ({ email }));

    try {
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        return response;
    } catch (err) {
        throw err;
    }
}

module.exports = { senderSmtpEmail };