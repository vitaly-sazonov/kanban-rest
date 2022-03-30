const { request, routes } = require('../lib');

const TEST_TASK_DATA = {
  title: 'Autotest task',
  order: 0,
  description: 'Lorem ipsum',
  userId: null,
  boardId: null,
  columnId: null
};

describe('Tasks suite', () => {
  describe('GET all', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.tasks.getAll('12345')).expect(401);
    });
  });

  describe('GET by id', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.tasks.getById('12345', '12345')).expect(401);
    });
  });

  describe('POST', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .post(routes.tasks.create('12345'))
        .set('Accept', 'application/json')
        .send(TEST_TASK_DATA)
        .expect(401);
    });
  });

  describe('PUT', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .put(routes.tasks.update('12345', '12345'))
        .set('Accept', 'application/json')
        .send(TEST_TASK_DATA)
        .expect(401);
    });
  });

  describe('DELETE', () => {
    it('should get 401 without token presented ', async () => {
      await request.delete(routes.tasks.delete('12345', '12345')).expect(401);
    });
  });
});
