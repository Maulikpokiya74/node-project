const express = require('express');

const routes = express.Router();

routes.use('/admin',require('./admin'));
 
module.exports = routes;