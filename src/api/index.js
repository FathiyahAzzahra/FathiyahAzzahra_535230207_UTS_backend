const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const produks = require('./components/produks/produks-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  produks(app);

  return app;
};
