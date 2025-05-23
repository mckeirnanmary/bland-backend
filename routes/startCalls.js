const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { calls } = req.body; // Array of contact info

  try {
    const response = await axios.post('https://api.bland.ai/v1/batches', {
      calls,
      voice_id: "nova", // or your preferred voice
      prompt: "Hi {{full_name}}, this is Nina from Publishers Clearing House...",
      function_call: {
        name: "verify_contact",
        parameters: {
          full_name: "{{full_name}}",
          address: "{{street_address}}, {{city}}, {{state}}, {{zip_code}}"
        },
        url: `${process.env.BASE_URL}/api/verify`
      }
    }, {
      headers: {
        Authorization: `Bearer ${process.env.BLAND_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
});

module.exports = router;
