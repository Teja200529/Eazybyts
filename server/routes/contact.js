import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ msg: 'All fields are required' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Contact from ${name} (${email})`,
      text: `You have a new message from ${name} (${email}):\n\n${message}`,
      replyTo: email,
    });
    res.json({ msg: 'Your message was sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to send message' });
  }
});

export default router;
