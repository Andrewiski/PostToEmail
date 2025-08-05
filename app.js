const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

const emailUser = process.env.EMAIL_USER || 'default@example.com';
const emailPass = process.env.EMAIL_PASS || 'password or app token';

const emailRecipient = process.env.EMAIL_RECIPIENT || 'default@example.com';

const port = process.env.PORT || 8080;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure your email transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: emailUser,       // replace with your email
    pass: emailPass // use app password if 2FA is enabled
  }
});



let postGetHandler = async (req, res) => {
    try {
        const queryParams = req.query || {noqueryParams: 'No query parameters'};
        const bodyData = req.body || {nopostData: 'No POST data'};
        // Format the email content
        const emailContent = `
        📩 New Data Received
        🔹 Query Parameters:
        ${JSON.stringify(queryParams, null, 2)}
        🔹 POST Body:
        ${JSON.stringify(bodyData, null, 2)}
        `;
        //console.log('Email Content:', emailContent);
        // Send the email
        await transporter.sendMail({
        from: '"Post to Email" <' + emailUser + '>', // sender address
        to: emailRecipient, // replace with recipient email
        subject: 'Forwarded Data from Post to Email App',
        text: emailContent
        });

        res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).send({ error: 'Failed to send email' });
  }
};

// Endpoint to receive POST requests
app.post('/receive', postGetHandler);
app.get('/receive', postGetHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});