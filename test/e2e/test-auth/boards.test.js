const { request, routes } = require('../lib');

const TEST_BOARD_DATA = {
  title: 'Autotest board',
  columns: [
    { title: 'Backlog', order: 1 },
    { title: 'Sprint', order: 2 }
  ]
};
describe('Boards suite', () => {
  describe('GET all boards', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.boards.getAll).expect(401);
    });
  });

  describe('GET board by id', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.boards.getById('12345')).expect(401);
    });
  });

  describe('POST', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .post(routes.boards.create)
        .set('Accept', 'application/json')
        .send(TEST_BOARD_DATA)
        .expect(401);
    });
  });

  describe('PUT', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .put(routes.boards.update('12345'))
        .set('Accept', 'application/json')
        .send(TEST_BOARD_DATA)
        .expect(401);
    });
  });

  describe('DELETE', () => {
    it('should get 401 without token presented ', async () => {
      await request.delete(routes.boards.delete('12345')).expect(401);
    });
  });
});
