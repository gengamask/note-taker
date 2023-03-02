const notes = require('./notes');
const express = require('express');

const app = express();

app.use('/notes', notes);

module.exports = app;