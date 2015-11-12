'use strict';

var Quo = function (status) {
  this.status = status;
};

var myQuo = new Quo('confused');
console.log(myQuo.first); // undefined
Quo.prototype.first = 'abc';
console.log(myQuo.first); // abc