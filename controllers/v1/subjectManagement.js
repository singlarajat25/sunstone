const {
  handleResponse,
  handleError,
} = require('../../common/middlewares/requestHandlers');

const {
  save,
  update,
  deleteSubject,
  get,
  getAll,
} = require('../../dbServices/v1/subjects');

const { checkSubjectEnrollment } = require('../../dbServices/v1/user');

module.exports.getSubject = async ({ params: { subjectId } }, res) => {
  try {
    const data = await get(subjectId);
    if (data) {
      handleResponse({ res, data });
    } else handleResponse({ res, msg: 'Subject(s) not found' });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.getAllSubjects = async (req, res) => {
  try {
    const data = await getAll();
    if (data.length > 0) {
      handleResponse({ res, data });
    } else handleResponse({ res, msg: 'Subject(s) not found' });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.addSubject = async ({ body }, res) => {
  try {
    const data = await save(body);
    handleResponse({ res, data });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.updateSubject = async ({ body, params: { subjectId } }, res) => {
  try {
    const data = await update(subjectId, body);
    handleResponse({ res, data });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.deleteSubject = async ({ params: { subjectId } }, res) => {
  try {
    const isSubjectEnrolled = await checkSubjectEnrollment(subjectId);
    if (isSubjectEnrolled) return handleResponse({ res, msg: 'Cannot delete an already enrolled subject' });

    const data = await deleteSubject(subjectId);
    if (data) {
      handleResponse({ res, msg: 'Subject has been deleted' });
    } else handleResponse({ res, msg: 'Subject not found' });
  } catch (err) {
    handleError({ res, err });
  }
};
