const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;
const SECRET_KEY = 'your-secret-key';

// Predefined mobile numbers with stores
const mobileHasStores = ['9876543210', '9123456789', '9999999999'];

app.post('/auth/send-otp', (req, res) => {
  const { mobile } = req.body;
  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ success: false, error: 'Invalid mobile number' });
  }
  console.log(`OTP sent to ${mobile} (stub)`);
  return res.json({ success: true, message: 'OTP sent successfully' });
});

app.post('/auth/verify-otp', (req, res) => {
  const { mobile } = req.body;
  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ success: false, error: 'Invalid mobile number' });
  }
  const hasStores = mobileHasStores.includes(mobile);
  const token = jwt.sign({ mobile }, SECRET_KEY, { expiresIn: '1h' });
  return res.json({ success: true, token, mobile, hasStores });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
