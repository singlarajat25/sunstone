const mongoose = require('mongoose');

const { Schema } = mongoose;

const db = require('../connections/dbMaster');
const defaultSchema = require('../common/plugins/defaultSchemaAttr');

// Define our subject schema
const SubjectSchema = new Schema({
  name: { type: String, default: '' },
  code: {
    type: Number,
    required: true,
  },
});

SubjectSchema.plugin(defaultSchema);
module.exports = db.model('subjects', SubjectSchema);
