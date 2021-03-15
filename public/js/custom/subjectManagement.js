subjectTable = $('#subjectTable').DataTable();
let activeSubject = '';

const createSubject = async () => {
  const formData = $('#createSubjectForm');
  formData.validate({
    rules: {
      name: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      code: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
    },
  });

  if (formData.valid()) {
    const url = '/api/v1/subjects/add-subject';
    const newUser = {
      name: $('#name').val(),
      code: Number($('#code').val()),
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

const deleteSubject = async (id) => {
  const url = `/api/v1/subjects/delete/${id}`;

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

const updateSubject = async () => {
  const formData = $('#updateSubjectForm');
  formData.validate({
    rules: {
      name_edit: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
      code_edit: {
        required: true,
        normalizer(value) {
          return $.trim(value);
        },
      },
    },
  });

  if (formData.valid()) {
    const url = `/api/v1/subjects/update-subject/${activeSubject}`;
    const newUser = {
      name: $('#name_edit').val(),
      code: Number($('#code_edit').val()),
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

const setSubjectdetails = async (id, name, code) => {
  activeSubject = id;
  $('#name_edit').val(name);
  $('#code_edit').val(code);
  $('#updateSubject').modal('show');
};
