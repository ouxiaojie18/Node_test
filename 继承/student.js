var util = require('util');
var Person = require('./person');

function Student(){
    Person.call(this);
}

// 将Student继承Person
util.inherits(Student,Person);

// 重写study方法
Student.prototype.study = function(){
    console.log('I am learning');
}

module.exports= Student;