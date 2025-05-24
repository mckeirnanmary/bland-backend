const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Verification endpoint is active.');
});

router.post('/', (req, res) => {
  const { full_name, address } = req.body;

  // Basic dummy verification logic
  if (full_name && address) {
    return res.json({
      result: true,
      message: `Contact ${full_name} at ${address} verified.`
    });
  }

  res.status(400).json({ result: false, message: "Missing data." });
});

module.exports = router;
