const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const startCalls = require('./routes/startCalls');
const verify = require('./routes/verify');

const app = express();
app.use(bodyParser.json());

app.use('/start-calls', startCalls);
app.use('/api/verify', verify);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
