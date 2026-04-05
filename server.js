require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const otps = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendMail({ to, subject, text }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
  });
}

// Send OTP to the given email
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const code = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otps.set(email, { code, expiresAt });

  try {
    await sendMail({
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is ${code}. It expires in 5 minutes.`,
    });

    res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error('Failed to send OTP', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: 'Email and code required' });

  const entry = otps.get(email);
  if (!entry) return res.status(400).json({ message: 'No OTP request found or expired' });

  if (Date.now() > entry.expiresAt) {
    otps.delete(email);
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (entry.code !== code) return res.status(400).json({ message: 'Invalid code' });

  otps.delete(email);
  return res.json({ message: 'Verified' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
