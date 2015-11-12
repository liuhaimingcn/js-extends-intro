'use strict';

function add(a, b) {
  return a + b;
}

var array = [3, 4];
var sum = add.apply(null, array); // sum值为7
console.log('sum:' + sum);

var Quo = function (status) {
  this.status = status;
};

Quo.prototype.get_status = function () {
  return this.status;
};

var statusObject = {
  status:'A-OK'
};
var status =Quo.prototype.get_status.apply(statusObject); // status的值为'A-OK'
console.log('status:' + status);