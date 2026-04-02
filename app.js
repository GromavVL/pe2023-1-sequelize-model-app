const express = require('express');
const { errorHandlers } = require('./middleware');
const router = require('./routes');
const { STATIC_PATCH } = require('./constants');

const app = express();

app.use(express.static(STATIC_PATCH));
app.use(express.json());
app.use('/api', router);
app.use(errorHandlers.errorHandler);

module.exports = app;
