module.exports = {
  users: {
    getAll: '/users',
    getById: id => `/users/${id}`,
    create: '/users',
    update: id => `/users/${id}`,
    delete: id => `/users/${id}`
  },
  tasks: {
    getAll: boardId => `/boards/${boardId}/tasks`,
    getById: (boardId, taskId) => `/boards/${boardId}/tasks/${taskId}`,
    create: boardId => `/boards/${boardId}/tasks`,
    update: (boardId, taskId) => `/boards/${boardId}/tasks/${taskId}`,
    delete: (boardId, taskId) => `/boards/${boardId}/tasks/${taskId}`
  },
  boards: {
    getAll: '/boards',
    getById: id => `/boards/${id}`,
    create: '/boards',
    update: id => `/boards/${id}`,
    delete: id => `/boards/${id}`
  },
  login: '/login'
};
