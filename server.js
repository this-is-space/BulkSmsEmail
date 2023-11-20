// Require necessary modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Vonage } = require('@vonage/server-sdk')

// Initialize Express app
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());


// Endpoint to send emails
app.post('/sendemail', async (req, res) => {
    const { emailList, subject, message } = req.body;

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'spaceofficial44@gmail.com', // Replace with your email
            pass: 'clvi csvh svkf crlz', // Replace with your email password or app-specific password
        },
    });

    // Email options
    const mailOptions = {
        from: '"BULK SENDER" <spaceofficial44@gmail.com>', // Sender address
        to: emailList, // List of recipients
        subject: subject, // Subject line
        text: message, // Plain text body
    };

    // Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.send('Email sent successfully');
    } catch (error) {
        console.error('Error while sending mail:', error);
        res.status(500).send('Error while sending email');
    }
});

// Endpoint to send SMS
app.post('/sendbulksms', async (req, res) => {
    const { numList, message } = req.body;
    try {
        await sendBulkSMS(numList, message);
        res.send('SMS sent successfully to all numbers');
    } catch (error) {
        console.error('Error while sending SMS:', error);
        res.status(500).send('Error while sending SMS');
    }
});

// Function to send bulk SMS using Vonage
async function sendBulkSMS(numList, message) {
    const vonage = new Vonage({
        apiKey: "e1abe581",
        apiSecret: "HfmFYhBE3VUl6IDg"
      })
    for (let number of numList) {
        await vonage.sms.send({
            to: number,
            from: "Vonage APIs",
            text: message
        });
    }
}



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
