const Model = require('../../models/userModel');

module.exports.save = async (data) => {
  const user = await new Model(data).save();
  return user;
};

module.exports.get = async (email) => {
  try {
    let user = await Model.aggregate([
      {
        $match: { email },
      },
      {
        $lookup: {
          from: 'subjects',
          localField: 'subjects.subjectId',
          foreignField: '_id',
          as: 'subjects',
        },
      },
      {
        $project: {
          'subjects.created': 0,
          'subjects.modified': 0,
          'subjects.isDeleted': 0,
          'subjects.__v': 0,
        },
      },
    ]);
    if (user.length >= 1) {
      [user] = user;
      return user;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

module.exports.getList = async (role) => {
  const data = await Model.find({
    ...(role && {role}),
  }).sort({ modified: -1 });
  return data;
};

module.exports.deleteUser = async (email) => {
  try {
    const { deletedCount } = await Model.deleteOne({ email });
    return !!deletedCount;
  } catch (error) {
    throw error;
  }
};

module.exports.update = async (email,
  {
    firstName,
    lastName,
    phone,
    role,
    gender,
    subjects,
  }) => {
  try {
    const { nModified } = await Model.updateOne(
      { email },
      {
        $set: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(phone && { phone }),
          ...(role && { role }),
          ...(gender && { gender }),
          ...(subjects && { subjects }),
        },
      },
      {
        runValidators: true,
      },
    );
    return !!nModified;
  } catch (error) {
    throw error;
  }
};

module.exports.checkSubjectEnrollment = async (subjectId) => {
  try {
    const enrollments = await Model.countDocuments({ 'subjects.subjectId': subjectId });
    return (enrollments > 0);
  } catch (error) {
    throw error;
  }
};
