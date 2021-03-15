module.exports = {
  add: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        required: true,
      },
      code: {
        type: 'number',
        required: true,
      },
    },
  },
  subjectId: {
    type: 'object',
    properties: {
      subjectId: { type: 'string', required: true },
    },
  },
  update: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      code: { type: 'number' },
    },
  },
};
