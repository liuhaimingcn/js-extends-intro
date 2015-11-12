//"use strict";

function add(a, b) {
  return a + b;
}

var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += inc;
  }
};

myObject.double = function () {
  var that = this;
  var helper = function () {
    console.log('this result:' + (this === global)); // this result:true
    console.log('that result:' + (that === myObject)); // that result:true
    that.value = add(that.value, that.value);
  };
  helper();
};

myObject.increment(3);
console.log('value:' + myObject.value); // value:3
myObject.double();
console.log('value:' + myObject.value); // value:6