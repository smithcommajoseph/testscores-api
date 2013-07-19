var _ = require('underscore'),
    Q = require('q'),
    mongoDb = require(appDir + '/server/lib/app-db'),
    Schema = mongoDb.Schema,
    mongoose = mongoDb.mongoose,
    StudentSchema;

StudentSchema = new Schema({
  name: {type: String, required: true}, //keeping it simple, no fname/lname biz
  grade: {type: Number, required: true} //this should be it's own model, but for brevity...
});

StudentSchema.statics.findAll = function findById() {
  var deferred = Q.defer();
  this.find({}, function(err, students){
    if(!err) deferred.resolve(students);
    else deferred.reject(err);
  });
  return deferred.promise;
};

StudentSchema.statics.findById = function findById(studentId) {
  var deferred = Q.defer();
  this.findOne({_id: studentId}, function(err, student){
    if(!err) deferred.resolve(student);
    else deferred.reject(err);
  });
  return deferred.promise;
};

StudentSchema.statics.deleteById = function deleteById(studentId) {
  var deferred = Q.defer();
  this.remove({_id: studentId}, function(err){
    if(!err) deferred.resolve('{"hooray": "sucessfully deleted"}');
    else deferred.reject(err);
  });
  return deferred.promise;
};

StudentSchema.methods.saveDocument = function saveDocument(){
  var deferred = Q.defer();
  this.save(function(err, student){
    console.log('------------');
    console.log(err);
    if(!err) deferred.resolve(student);
    else deferred.reject(err);
  });
  return deferred.promise;
};

StudentSchema.methods.updateProperties = function updateProperties(params) {
  this.name = params.name || this.name;
  this.grade = params.grade || this.grade;
  return this;
};

module.exports = mongoose.model('Student', StudentSchema);
