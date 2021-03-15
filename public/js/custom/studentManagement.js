studentTable = $('#studentTable').DataTable();
let activeUser = '';

const createStudent = async () => {
  const formData = $('#createSubjectForm');
  formData.validate({
    rules: {
      firstName: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      lastName: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      role: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      gender: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      phone: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      email: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      subject: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
    },
  });

  if (formData.valid()) {
    const url = '/api/v1/users/add-user';
    const subjects = [];
    $('#subject').val().forEach((sub) => {
      subjects.push({
        subjectId: sub,
      });
    });

    const newUser = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      phone: $('#phone').val(),
      email: $('#email').val(),
      role: $('#role').val(),
      gender: $('#gender option:selected').text().toLowerCase(),
      subjects,
    };

    try {
      const userData = await axios({ method: 'post', url, data: newUser });
      const { data: { data, msg } } = userData;
      swal({
        text: msg,
      }).then(() => {
        window.location = '';
      });
    } catch (error) {
      swal({
        text: error,
      });
    }
  }
};

const deleteStudent = async (email) => {
  const url = `/api/v1/users/delete/${email}`;

  try {
    const userData = await axios({ method: 'delete', url });
    const { data: { data, msg } } = userData;
    swal({
      text: msg,
    }).then(() => {
      window.location = '';
    });
  } catch (error) {
    swal({
      text: error,
    });
  }
};

const getUser = async (email) => {
  activeUser = email;
  const url = `/api/v1/users/get-user/${email}`;
  try {
    const userData = await axios({ method: 'get', url });

    const { data: { data, msg } } = userData;
    const subectList = [];
    data.subjects.forEach((ele) => {
      subectList.push(ele._id);
    });
    console.log(data);
    $('#email_edit').val(data.email);
    $('#firstName_edit').val(data.firstName);
    $('#lastName_edit').val(data.lastName);
    $('#phone_edit').val(data.phone);
    $('#gender_edit').val(data.gender);
    $('#role_edit').val(data.role);
    $('#subject_edit').val(subectList);

    $('#editFaculty').modal('show');
  } catch (error) {
    swal({
      text: error,
    });
  }
};

const editUser = async () => {
  const formData = $('#editUserForm');
  formData.validate({
    rules: {
      firstName_edit: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      lastName_edit: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      role_edit: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      phone_edit: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      gender_edit: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      subject_edit: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
    },
  });

  if (formData.valid()) {
    const url = `/api/v1/users/update-user/${activeUser}`;
    const subjects = [];
    $('#subject_edit').val().forEach((sub) => {
      subjects.push({
        subjectId: sub,
      });
    });

    const newUser = {
      firstName: $('#firstName_edit').val(),
      lastName: $('#lastName_edit').val(),
      phone: $('#phone_edit').val(),
      role: $('#role_edit').val(),
      gender: $('#gender_edit option:selected').text().toLowerCase(),
      subjects,
    };

    try {
      const userData = await axios({ method: 'put', url, data: newUser });
      const { data: { data, msg } } = userData;
      swal({
        text: msg,
      }).then(() => {
        window.location = '';
      });
    } catch (error) {
      swal({
        text: error,
      });
    }
  }
};

const viewStudent = async (email) => {
  window.location.href = `/profile/${email}`;
};
