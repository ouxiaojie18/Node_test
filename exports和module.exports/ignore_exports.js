module.exports = 'test for module.exports ignore!';
exports.name = 'mosquito';
exports.showName = function(){
  console.log('My name is mosquito');      
}
console.log(module.exports);