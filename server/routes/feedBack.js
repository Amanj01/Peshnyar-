const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/feedback', async (req, res) => {
  const { email, name, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amanjshkur15@gmail.com',
      pass: 'pyhg hrua vdjo spvw',
    },
  });

  const mailOptions = {
    from: email,
    to: 'amanjshkur15@gmail.com',
    subject: `Feedback from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending feedback', error });
  }
});

module.exports = router;
