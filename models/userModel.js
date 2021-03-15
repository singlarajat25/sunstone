const mongoose = require('mongoose');

const { Schema } = mongoose;

const db = require('../connections/dbMaster');
const defaultSchema = require('../common/plugins/defaultSchemaAttr');

// Define our user schema
const UserSchema = new Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  profilePic: { type: String, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'faculty'],
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  subjects: [{
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'subjects',
    },
  }],
});

UserSchema.plugin(defaultSchema);
module.exports = db.model('users', UserSchema);
