const express = require('express');
const router = express.Router();

// GET route for test/debug
router.get('/', (req, res) => {
  res.send('✅ verify endpoint is live!');
});

router.post('/', (req, res) => {
  const { full_name, address } = req.body;

  if (full_name && address) {
    return res.json({
      result: true,
      message: `Contact ${full_name} at ${address} verified.`
    });
  }

  res.status(400).json({ result: false, message: "Missing data." });
});

module.exports = router;
