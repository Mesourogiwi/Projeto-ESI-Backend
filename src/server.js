const express = require('express');
// const routes = require('./routes');

require('dotenv').config();

const PORT = process.env.PORT || 3333;

require('./database');

const app = express();

// app.use(routes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
