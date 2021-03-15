const express = require('express');

const router = express.Router();
const { validate } = require('express-jsonschema');

const {
  register,
  email,
  updateUserValidations,
} = require('../common/utils/userValidations');

const {
  UserManagement: {
    getUserData,
    addUser,
    updateUser,
    deleteUser,
  },
} = require('../controllers/v1');

router.get('/get-user/:email', validate({ params: email }), getUserData);
router.post('/add-user', validate({ body: register }), addUser);
router.put('/update-user/:email', validate({ params: email, body: updateUserValidations }), updateUser);
router.delete('/delete/:email', validate({ params: email }), deleteUser);

module.exports = router;
