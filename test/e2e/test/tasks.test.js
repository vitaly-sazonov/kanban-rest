const { request: unauthorizedRequest, routes } = require('../lib');
const debug = require('debug')('rs:test:tasks');
const {
  createAuthorizedRequest,
  shouldAuthorizationBeTested
} = require('../utils');

const TEST_TASK_DATA = {
  title: 'Autotest task',
  order: 0,
  description: 'Lorem ipsum',
  userId: null,
  boardId: null,
  columnId: null
};

const TEST_BOARD_DATA = {
  title: 'Autotest board',
  columns: [
    { title: 'Backlog', order: 1 },
    { title: 'Sprint', order: 2 }
  ]
};

describe('Tasks suite', () => {
  let request = unauthorizedRequest;
  let testTaskId;
  let testBoardId;

  beforeAll(async () => {
    if (shouldAuthorizationBeTested) {
      request = await createAuthorizedRequest(unauthorizedRequest);
    }

    await request
      .post(routes.boards.create)
      .set('Accept', 'application/json')
      .send(TEST_BOARD_DATA)
      .then(res => (testBoardId = res.body.id));

    await request
      .post(routes.tasks.create(testBoardId))
      .set('Accept', 'application/json')
      .send(TEST_TASK_DATA)
      .then(res => (testTaskId = res.body.id));
  });

  afterAll(async () => {
    await request
      .delete(routes.boards.delete(testBoardId))
      .then(res => expect(res.status).oneOf([200, 204]));
  });

  describe('GET', () => {
    it('should get all tasks', async () => {
      await request
        .get(routes.tasks.getAll(testBoardId))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          debug(res.body);
          expect(res.body).to.be.an('array');
          jestExpect(res.body).not.toHaveLength(0);
        });
    });

    it('should get a task by id', async () => {
      // Setup
      let expectedTask;

      await request
        .get(routes.tasks.getAll(testBoardId))
        .expect(200)
        .then(res => {
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);
          expectedTask = res.body[0];
        });

      // Test
      await request
        .get(routes.tasks.getById(expectedTask.boardId, expectedTask.id))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          jestExpect(res.body).toEqual(expectedTask);
        });
    });
  });

  describe('POST', () => {
    it('should create task successfully', async () => {
      let taskId;

      await request
        .post(routes.tasks.create(testBoardId))
        .set('Accept', 'application/json')
        .send(TEST_TASK_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.id).to.be.a('string');
          taskId = res.body.id;
          jestExpect(res.body).toMatchObject({
            ...TEST_TASK_DATA,
            boardId: testBoardId
          });
        });

      // Teardown
      await request.delete(routes.tasks.delete(testBoardId, taskId));
    });
  });

  describe('PUT', () => {
    it('should update task successfully', async () => {
      // Setup
      let addedTask;

      await request
        .post(routes.tasks.create(testBoardId))
        .set('Accept', 'application/json')
        .send(TEST_TASK_DATA)
        .then(res => {
          addedTask = res.body;
        });

      const updatedTask = {
        ...addedTask,
        title: 'Autotest updated task'
      };

      // Test
      await request
        .put(routes.tasks.update(updatedTask.boardId, updatedTask.id))
        .set('Accept', 'application/json')
        .send(updatedTask)
        .expect(200)
        .expect('Content-Type', /json/);

      await request
        .get(routes.tasks.getById(updatedTask.boardId, updatedTask.id))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => jestExpect(res.body).toMatchObject(updatedTask));
    });
  });

  describe('DELETE', () => {
    it('should delete task successfully', async () => {
      await request
        .get(routes.tasks.getById(testBoardId, testTaskId))
        .expect(200);
      await request
        .delete(routes.tasks.delete(testBoardId, testTaskId))
        .then(res => expect(res.status).oneOf([200, 204]));

      await request
        .get(routes.tasks.getById(testBoardId, testTaskId))
        .expect(404);
    });
  });
});
