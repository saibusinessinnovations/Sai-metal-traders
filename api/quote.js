const nodemailer = require('nodemailer');

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim();
    const companyName = (body.companyName || '').trim();
    const phone = (body.phone || '').trim();
    const inquiryType = (body.inquiryType || '').trim();
    const material = (body.material || '').trim();
    const quantity = (body.quantity || '').trim();
    const destination = (body.destination || '').trim();
    const message = (body.message || '').trim();

    if (!fullName || !email || !inquiryType || !material) {
      return res.status(400).json({ ok: false, error: 'Missing required RFQ fields.' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email address.' });
    }

    const EMAIL_USER = requiredEnv('EMAIL_USER');
    const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS;
    if (!EMAIL_APP_PASSWORD) throw new Error('Missing environment variable: EMAIL_APP_PASSWORD');
    const TO_EMAIL = process.env.TO_EMAIL || EMAIL_USER;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    const leadRows = [
      ['Full Name', fullName],
      ['Company Name', companyName || 'Not provided'],
      ['Email', email],
      ['Phone / WhatsApp', phone || 'Not provided'],
      ['Inquiry Type', inquiryType],
      ['Material', material],
      ['Quantity / Volume', quantity || 'Not provided'],
      ['Destination', destination || 'Not provided'],
      ['Message', message || 'Not provided'],
      ['Submitted At', new Date().toISOString()],
      ['Website', 'saimetaltraders.vercel.app'],
    ];

    const internalText = `New Sai Metal Traders RFQ\n\n${leadRows.map(([k, v]) => `${k}: ${v}`).join('\n')}`;
    const internalHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111">
        <h2>New Sai Metal Traders RFQ</h2>
        <p>A new website lead has been submitted. Client details are below.</p>
        <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#ddd;width:100%;max-width:760px">
          ${leadRows.map(([k, v]) => `<tr><td style="font-weight:bold;background:#f6f6f6;width:220px">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`).join('')}
        </table>
        <p style="margin-top:18px">Reply directly to this email to respond to the client.</p>
      </div>`;

    const clientText = `Dear ${fullName},\n\nThank you for contacting Sai Metal Traders. We have received your inquiry regarding ${material}.\n\nOur team will review the details and connect with you soon to discuss material grade, quantity, pricing reference, documentation, and shipment requirements.\n\nRegards,\nSai Metal Traders\nsaimetaltraders@gmail.com\n+1-647-673-1622`;
    const clientHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h2>Thank you for contacting Sai Metal Traders</h2>
        <p>Dear ${escapeHtml(fullName)},</p>
        <p>Thank you for contacting Sai Metal Traders. We have received your inquiry regarding <strong>${escapeHtml(material)}</strong>.</p>
        <p>Our team will review the details and connect with you soon to discuss material grade, quantity, pricing reference, documentation, and shipment requirements.</p>
        <p>Regards,<br><strong>Sai Metal Traders</strong><br>saimetaltraders@gmail.com<br>+1-647-673-1622</p>
      </div>`;

    await transporter.sendMail({
      from: `Sai Metal Traders <${EMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New RFQ: ${material} - ${companyName || fullName}`,
      text: internalText,
      html: internalHtml,
    });

    await transporter.sendMail({
      from: `Sai Metal Traders <${EMAIL_USER}>`,
      to: email,
      replyTo: TO_EMAIL,
      subject: 'Thank you for your inquiry - Sai Metal Traders',
      text: clientText,
      html: clientHtml,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('RFQ email error:', error);
    return res.status(500).json({ ok: false, error: 'Email service is not configured or temporarily unavailable.' });
  }
};
