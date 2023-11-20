import { createTransport } from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = createTransport({
    host: 'smtp.gmail.com', // Replace with your mail server
    port: 587, // Commonly, 587 for TLS or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'spaceofficial44@gmail.com', // Replace with your email
        pass: 'clvi csvh svkf crlz', // Replace with your password
    },
});

// Email data
const mailOptions = {
    from: '"BULK SMS & EMAIL SENDER" <spaceofficial44@gmail.com>', // Sender address
    to: ['space@spacexd.in', 'singhnishil041@gmail.com'], // List of recipients
    subject: 'Bulk Email sent by SPACE', // Subject line
    text: 'Hello, this is a test bulk email!', // Plain text body
};

// Send emails
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error while sending mail: ', error);
    }
    console.log('Message sent: %s', info.messageId);
});
