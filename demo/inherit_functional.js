'use strict';

var mammal = function (spec) {
  var that = {};
  that.get_name = function () {
    return spec.name;
  };
  that.says = function () {
    return spec.saying || '';
  };
  return that;
};
var myMammal = mammal({name: 'Herb the Mammal'});
console.log('myMammal name:' + myMammal.get_name());

var cat = function (spec) {
  spec.saying = 'meow';
  var that = mammal(spec);
  that.purr = function (n) {
    var s = '';
    for (var i = 0; i < n; i++) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };
  that.get_name = function () {
    return that.says() + ' ' + spec.name;
  };
  return that;
};
var myCat = cat({name: 'Henrietta'});
console.log('says:' + myCat.says());
console.log('purr:' + myCat.purr(5));
console.log('myCat name:' + myCat.get_name());









