const express = require('express');

const router = express.Router();

const { getAll } = require('../dbServices/v1/subjects');
const { getList, get } = require('../dbServices/v1/user');

/* GET home page. */
router.get('/', async (req, res) => {
  const students = await getList('student');
  const faculty = await getList('faculty');
  const subs = await getAll();
  res.render('index',
    {
      title: 'Dashboard',
      activeBar: 'dashboard',
      studentCount: students.length,
      facultyCount: faculty.length,
      subjectCount: subs.length,
    });
});

router.get('/user-management', async (req, res) => {
  const list = await getList();
  const subjectList = await getAll();
  res.render('studentManagement', { title: 'User Management', activeBar: 'user', list, subjectList });
});

router.get('/subject-management', async (req, res) => {
  const list = await getAll();
  res.render('subjectManagement', { title: 'Subject Management', activeBar: 'subject', list });
});

router.get('/profile/:email', async ({ params: { email } }, res) => {
  const user = await get(email);
  res.render('profile-details', { title: 'User Profile', activeBar: 'profile', user });
});

module.exports = router;
