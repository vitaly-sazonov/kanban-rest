export default {
  type: 'object',
  properties: {
    id: {
      example: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
    },
    title: {
      example: 'Done',
    },
    order: {
      example: 1,
    },
    tasks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            example: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
          },
          title: {
            example: 'Task: pet the cat',
          },
          order: {
            example: 1,
          },
          done: {
            example: false,
          },
          description: {
            example: 'Domestic cat needs to be stroked gently',
          },
          userId: {
            example: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          },
          files: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                filename: { example: 'foto.jpg' },
                fileSize: { example: 6105000 },
              },
            },
          },
        },
      },
    },
  },
};
