const Contact = require('../models/Contact');
const sendEmail = require('../utils/emailService');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save contact submission to database
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    await contact.save();

    // Send email notification
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};