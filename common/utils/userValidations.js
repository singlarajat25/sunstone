module.exports = {
  register: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        required: true,
      },
      lastName: {
        type: 'string',
        required: true,
      },
      phone: {
        type: 'string',
        required: true,
      },
      email: {
        type: 'string',
        required: true,
        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      },
      role: {
        type: 'string',
        enum: ['faculty', 'student'],
        required: true,
      },
      gender: {
        type: 'string',
        enum: ['male', 'female'],
        required: true,
      },
      subjects: [{
        type: 'object',
        properties: {
          subjectId: { type: 'string', required: true },
        },
      }],
    },
  },
  email: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        required: true,
      },
    },
  },
  updateUserValidations: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      phone: {
        type: 'string',
      },
      role: {
        type: 'string',
        enum: ['faculty', 'student'],
      },
      gender: {
        type: 'string',
        enum: ['male', 'female'],
      },
      subjects: [{
        type: 'object',
        properties: {
          subjectId: { type: 'string' },
        },
      }],
    },
  },
};
