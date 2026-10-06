import 'dotenv/config';
import nodemailer from 'nodemailer';

async function testSMTP() {
  console.log('Testing SMTP connection with credentials from .env...');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully!');
    
    // Optional: send a test email to the configured TO address
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: 'Test Email from MDTT API',
      text: 'This is a test email to verify SMTP configuration is working.'
    });
    console.log('Test email sent:', info.messageId);
  } catch (err) {
    console.error('SMTP test failed:', err);
  }
}

testSMTP();
