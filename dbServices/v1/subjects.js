const Model = require('../../models/subjectModel');

module.exports.save = async (data) => {
  const subject = await new Model(data).save();
  return subject;
};

module.exports.get = async (subjectId) => {
  const subject = await Model.findOne({ _id: subjectId });
  return subject;
};

module.exports.getAll = async () => {
  const subjects = await Model.find();
  return subjects;
};

module.exports.update = async (subjectId,
  {
    name,
    code,
  }) => {
  try {
    const data = await Model.findByIdAndUpdate(
      subjectId,
      {
        $set: {
          ...(name && { name }),
          ...(code && { code }),
        },
      },
      {
        runValidators: true,
        new: true,
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports.deleteSubject = async (subjectId) => {
  try {
    const { deletedCount } = await Model.deleteOne({ _id: subjectId });
    return !!deletedCount;
  } catch (error) {
    throw error;
  }
};
