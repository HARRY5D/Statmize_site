// server.js - Node.js server for handling STATmize contact form submissions
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow only the client URL
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create the nodemailer transporter with SMTP settings
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // For testing only, remove in production
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        // Get form data
        const { name, email, phone = 'Not provided', message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all required fields.'
            });
        }

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please enter a valid email address.'
            });
        }

        // Email HTML content
        const htmlContent = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                h2 {
                    color: #3481ed;
                }
                .info {
                    margin-bottom: 20px;
                }
                .label {
                    font-weight: bold;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 0.8em;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>New Contact Form Submission from STATmize</h2>
                <div class='info'>
                    <p><span class='label'>Name:</span> ${name}</p>
                    <p><span class='label'>Email:</span> ${email}</p>
                    <p><span class='label'>Phone:</span> ${phone}</p>
                    <p><span class='label'>Message:</span></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
                <div class='footer'>
                    <p>This email was sent from the contact form on the STATmize website.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Configure email options
        const mailOptions = {
            from: `"STATmize Website" <${process.env.SENDER_EMAIL}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: 'New Contact Form Submission from STATmize',
            html: htmlContent
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        // Success response
        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully!'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again.'
        });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'STATmize API server is running'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS origin set to: ${process.env.CLIENT_URL || 'http://localhost:5500'}`);
});
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS enabled for origin: ${process.env.CLIENT_URL}`);
});
