const supertest = require('supertest');
const debug = require('debug')('rs:lib');

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../../.env')
});

const routes = require('./routes');

const host =
  process.env.HOST || process.env.PORT
    ? `localhost:${process.env.PORT}`
    : 'localhost:4000';
debug('HOST', host);

const request = supertest(host);

module.exports = {
  request,
  routes
};
