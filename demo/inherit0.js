'use strict';

Function.prototype.new = function () {
  // 创建一个新对象，它继承自构造函数的原型对象
  var that = Object.create(this.prototype);
  // 调用构造函数，绑定this到新对象
  var other = this.apply(that, arguments);
  // 如果它的返回值不是一个对象则返回该对象
  return (typeof other === 'object' && other) || that;
};

var Mammal = function (name) {
  this.name = name;
};

Mammal.prototype.get_name = function () {
  return this.name;
};

Mammal.prototype.says = function () {
  return this.saying || '';
};

var myMammal = Mammal.new('Herb the Mammal'); // myMammal值为 'Herb the Mammal'
console.log('myMammal name:' + myMammal.get_name());

var twoMammal = new Mammal('Herb the Mammal'); // twoMammal 'Herb the Mammal'
console.log('twoMammal name:' + twoMammal.get_name());