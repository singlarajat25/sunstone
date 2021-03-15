const express = require('express');

const router = express.Router();
const { validate } = require('express-jsonschema');

const {
  add,
  subjectId,
  update,
} = require('../common/utils/subjectValidtions');

const {
  SubjectManagement: {
    addSubject,
    deleteSubject,
    updateSubject,
    getSubject,
    getAllSubjects,
  },
} = require('../controllers/v1');

router.get('/get-all-subjects/', getAllSubjects);
router.get('/get-subject/:subjectId', validate({ params: subjectId }), getSubject);

router.post('/add-subject', validate({ body: add }), addSubject);

router.put('/update-subject/:subjectId', validate({ params: subjectId, body: update }), updateSubject);

router.delete('/delete/:subjectId', validate({ params: subjectId }), deleteSubject);

module.exports = router;
