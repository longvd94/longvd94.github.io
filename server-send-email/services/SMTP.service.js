const nodemailer = require('nodemailer');

const transport = {
    // this is the authentication for sending email.
    host: process.env.SMTP_HOSTNAME,
    port: process.env.SMTP_PORT,
    secure: false, // use TLS
    // create a .env file and define the process.env variables 
    // with your credentials.
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
}

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        //if error happened code ends here
        console.error('transporter', error)
    } else {
        //this means success
        console.log('Ready to send mail!')
    }
})


async function transporterEmail(data) {
    const mailInfo = {
        from: `${data.sender_name} <${data.sender_email}>`,
        to: data.recipients.join(','),
        subject: data.subject,
        html: data.message || '',
    };
   
    try {
        const response = await transporter.sendMail(mailInfo);
        return response;
    } catch (err) {
        throw err;
    }
}

module.exports = { transporterEmail };