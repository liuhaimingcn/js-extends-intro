'use strict';

var Quo = function (status) {
  this.status = status;
};
Quo.prototype.first = 'abc';

var myQuo = new Quo('confused');
console.log(myQuo.first); // abc
myQuo.first = 'def';
console.log(myQuo.first); // def
console.log(Quo.prototype.first); // abc