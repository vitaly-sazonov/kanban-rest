export default {
  status: 404,
  schema: {
    type: 'object',
    properties: {
      statusCode: { example: 404 },
      message: { example: 'User was not founded!' },
    },
  },
};
