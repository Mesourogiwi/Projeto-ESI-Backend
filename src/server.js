const express = require('express');
const routes = require('./routes');
const swaggerDoc = require('./utils/swagger.json')
const swaggerUi = require('swagger-ui-express')

require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ? '.env.test' : '.env'
})

const PORT = process.env.PORT || 3333;

require('./database');

const app = express();

app.use(express.json())
app.use(routes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = app