var StudentModel = require(appDir + '/app/models/student'),
    utils = require(appDir + '/app/utils/controllers');

exports.init = function init(app){
  app.post    ( '/students',       _newStudent );
  app.get     ( '/students',       _getAllStudents );
  app.put     ( '/students/:id',   _updateStudent );
  app.get     ( '/students/:id',   _getStudent );
  app.delete  ( '/students/:id',   _deleteStudent );
};

function _newStudent(req, res) {
  var student = new StudentModel({
    name: req.body.name,
    grade: req.body.grade
  });
  student.saveDocument()
  .then(function(data) {
    utils.sendApiData(res, null, data);
  })
  .fail(function(err) {
    utils.sendApiData(res, err, null);
  });
}

function _getAllStudents(req, res) {
  StudentModel.findAll()
  .then(function(data) {
    utils.sendApiData(res, null, data);
  })
  .fail(function(err) {
    utils.sendApiData(res, err, null);
  });
}

function _updateStudent(req, res) {
  StudentModel.findById(req.params.id)
  .then(function(student){
    return student
    .updateProperties.call(student, req.body)
    .saveDocument.call(student);
  })
  .then(function(data) {
    utils.sendApiData(res, null, data);
  });
}

function _getStudent(req, res) {
  StudentModel.findById(req.params.id)
  .then(function success (data) {
    utils.sendApiData(res, null, data);
  })
  .fail(function error (err) {
    utils.sendApiData(res, err, null);
  });
}

function _deleteStudent(req, res) {
  StudentModel.deleteById(req.params.id)
  .then(function(data) {
    utils.sendApiData(res, null, data);
  })
  .fail(function(err) {
    utils.sendApiData(res, err, null);
  });
}