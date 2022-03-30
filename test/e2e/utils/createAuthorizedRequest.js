const { routes } = require('../lib');

const createRequestWithToken = (request, token) => {
  const obj = {};
  for (const key in request) {
    if (Object.prototype.hasOwnProperty.call(request, key)) {
      const method = request[key];
      obj[key] = path => method(path).set('Authorization', token);
    }
  }

  return obj;
};

const createAuthorizedRequest = async request => {
  const res = await request
    .post(routes.login)
    .set('Accept', 'application/json')
    .send({ login: 'admin', password: 'admin' });

  const token = `Bearer ${res.body.token}`;
  return createRequestWithToken(request, token);
};

module.exports = createAuthorizedRequest;
