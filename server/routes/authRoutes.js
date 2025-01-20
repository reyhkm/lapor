const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
const { username, password } = req.body;

if (username === 'admin' && password === 'password') {
    res.json({ success: true, token: 'contoh_token_123' });
} else {
    res.status(401).json({ success: false, message: 'Username atau password salah' });
}
});

module.exports = router;