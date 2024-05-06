const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const produksControllers = require('./produks-controller');
const produksValidator = require('./produks-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/produks', route);

  route.get('/', authenticationMiddleware, produksControllers.getProduks);

  route.post(
    '/',
    authenticationMiddleware,
    celebrate(produksValidator.createProduk),
    produksControllers.createProduk
  );

  route.get('/:id', authenticationMiddleware, produksControllers.getProduk);

  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(produksValidator.updateProduk),
    produksControllers.updateProduk
  );

  route.delete(
    '/:id',
    authenticationMiddleware,
    produksControllers.deleteProduk
  );
};
