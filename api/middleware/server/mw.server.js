
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

module.exports = server => {
  server.use(helmet());
  server.use(cors());
  server.use(express.json({ limit: '20mb' }));
  server.use(express.urlencoded({ extended: false, limit: '20mb' }));
  server.use(morgan('dev'));
};