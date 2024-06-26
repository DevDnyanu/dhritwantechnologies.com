const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');


const server = express();
server.use('/css', express.static(path.join(__dirname, 'css')));
server.use('/images', express.static(path.join(__dirname, 'images')));
server.use('/js', express.static(path.join(__dirname, 'js')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '/contact.html'));
    console.log(__dirname);
});

server.post("/", function (req, res) {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ambhorednyaneshvar@gmail.com',
            pass: 'wkge hkfx gunn pnia' // Ensure this is an app password if you have 2FA enabled
        }
    });

    const mailOptions = {
        from: 'ambhorednyaneshvar@gmail.com',
        to: email,
        cc: 'ambhorednyaneshvar@gmail.com',
        subject: subject || `Message from ${name}`, // Better subject handling
        text: message || `No message content` // Better message handling
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error details:', error);
            res.json({ success: false, message: `Error occurred, message not sent. Error: ${error.message}` });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true, message: "Message sent successfully!" });
        }
    });
});

server.listen(3000, function () {
    console.log("Server started at 3000");
});
