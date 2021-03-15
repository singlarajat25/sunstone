const {
  sampleImages,
} = require('../../config/config');

const {
  handleResponse,
  handleError,
} = require('../../common/middlewares/requestHandlers');

const {
  save,
  get,
  update,
  deleteUser,
} = require('../../dbServices/v1/user');

module.exports.addUser = async ({ body }, res) => {
  try {
    const user = await get(body.email);
    if (user) {
      return handleResponse({ res, msg: 'User with given email Id already exists!' });
    }
    body.profilePic = sampleImages[body.role][body.gender];
    const data = await save(body);
    handleResponse({ res, data });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.updateUser = async ({ body, params: { email } }, res) => {
  try {
    const data = await update(email, body);
    if (data) {
      const user = await get(email);
      handleResponse({ res, data: user });
    } else handleResponse({ res, msg: 'No user found or no new data found for edit' });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.deleteUser = async ({ params: { email } }, res) => {
  try {
    const data = await deleteUser(email);
    if (data) {
      handleResponse({ res, msg: 'User has been deleted successfully' });
    } else handleResponse({ res, msg: 'No user found with provided email' });
  } catch (err) {
    handleError({ res, err });
  }
};

module.exports.getUserData = async ({ params: { email } }, res) => {
  try {
    const user = await get(email);
    handleResponse({ res, data: user });
  } catch (err) {
    handleError({ res, err });
  }
};
