const express = require('express');

const router = express.Router();

const users = require('./users');
const subjects = require('./subjects');
const viewRoutes = require('./viewRoutes');

// View Routes
router.use('/', viewRoutes);

// Backend routes
router.use('/api/v1/users', users);
router.use('/api/v1/subjects', subjects);

module.exports = router;
