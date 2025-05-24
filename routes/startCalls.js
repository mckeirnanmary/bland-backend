const express = require('express');
const router = express.Router();
const axios = require('axios');

// Optional: test route
router.get('/', (req, res) => {
  res.send('✅ /start-calls endpoint is live and batch-ready!');
});

router.post('/', async (req, res) => {
  const { calls } = req.body; // expects [{ phone, prompt }, ...]

  if (!Array.isArray(calls) || calls.length === 0) {
    return res.status(400).json({ error: 'calls must be a non-empty array' });
  }

  try {
    const response = await axios.post(
      'https://api.bland.ai/v1/batches',
      {
        calls: calls.map(({ phone, prompt }) => ({
          phone_number: phone,
          task: prompt
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BLAND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.json({
      message: '📞 Batch calls started successfully!',
      batch_id: response.data.batch_id,
      status: response.data.status,
    });
  } catch (error) {
    console.error('❌ Error starting batch calls:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to start batch calls' });
  }
});

module.exports = router;
