module.exports = {
  db: {
    // str: 'mongodb://127.0.0.1:27017/demo',
    str: 'mongodb+srv://sunstone:demo@sunstone.vcige.mongodb.net/test',
    options: {
      auto_reconnect: true,
      reconnectTries: Number.MAX_SAFE_INTEGER,
      poolSize: 200,
      useNewUrlParser: true,
      readPreference: 'primaryPreferred',
    },
  },
  sampleImages: {
    faculty: {
      male: 'faculty-boy.jpg',
      female: 'faculty-girl.png',
    },
    student: {
      male: 'student-boy.png',
      female: 'student-girl.png',
    },
  },
};
