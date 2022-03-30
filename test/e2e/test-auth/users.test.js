const { request, routes } = require('../lib');

const TEST_USER_DATA = {
  name: 'TEST_USER',
  login: 'test_user',
  password: 'T35t_P@55w0rd'
};

describe('Users suite', () => {
  describe('GET all users', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.users.getAll).expect(401);
    });
  });

  describe('GET user by id', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.users.getById('123')).expect(401);
    });
  });

  describe('POST', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .post(routes.users.create)
        .send(TEST_USER_DATA)
        .expect(401);
    });
  });

  describe('PUT', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .put(routes.users.update('12345'))
        .send(TEST_USER_DATA)
        .expect(401);
    });
  });

  describe('DELETE', () => {
    it('should get 401 without token presented ', async () => {
      await request.delete(routes.users.delete('12345')).expect(401);
    });
  });
});
