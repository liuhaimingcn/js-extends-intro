# js-extends-intro
JavaScript的继承简介

在大多数编程语言中，继承都是一个重要的主题。 
 
在那些基于类的语言中（JAVA），继承（extends）是代码重用的一种形式，可以显著地减少软件开发的成本。  

在JAVA中对象是类的实例，并且类可以从另一个类继承。JavaScript是一门基于原型的语言，这意味着对象直接从其他对象继承。  

介绍JavaScript的继承之前先简单介绍一下JavaScript中几个重要的属性（this、prototype、constructor）,这些属性对于理解如何实现JavaScript中的继承起着至关重要的作用。

## this

JavaScript中的每个函数除了声明定义的形式参数，还接收了连个附加的参数：this和arguments。  

arguments是函数被调用时传递给它的参数列表。

```js
	function add() {
	  var sum = 0;
	  for (var i = 0; i < arguments.length; i++) {
	    sum += arguments[i];
	  }
	  return sum;
	}

	var value = add(1,2,3,4,5); // value值为15	
```

this是函数在调用时的上下文对象，它在函数不同的调用模式下初始化时会存在一些差异。在JavaScript中一共四种调用模式：方法调用模式，函数调用模式，构造器调用模式和apply调用模式。  

### 方法调用模式

当一个函数保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this被绑定到该对象。
  
```js
	var myObject = {
	  value: 0,
	  increment: function (inc) {
	    this.value += inc;
	  }
	};

	myObject.increment(3); 
	console.log('value:' + myObject.value); // value:3
```

### 函数调用模式

当一个函数并非一个对象的属性时，那么它就是被当作一个函数调用的。以此模式调用时，this被绑定到全局对象。  

```js
	function add(a, b) {
	  console.log('result:' + (this === global)); // result:true
	  return a + b;
	}
	console.log('value:' + add(1, 2)); //value:3
```

这是一个语言设计上的一个错误，如果语言设计正确，那么当内部函数被调用时，this应该仍然绑定到外部函数的this变量。  

解决办法

```js
	myObject.double = function () {
	  var that = this;
	  var helper = function () {
	    console.log('this result:' + (this === global)); // this result:true
	    console.log('that result:' + (that === myObject)); // that result:true
	    that.value = add(that.value, that.value);
	  };
	  helper();
	};

	myObject.double();
	console.log('value:' + myObject.value); // value:3
```

JavaScript严格模式下禁止this关键字指向全局对象。

### 构造器调用模式

如果在一个函数前面带上new来调用，那么背地里会创建一个连接到该函数的prototype成员的新对象，同时this会被绑定到新对象上

```js
function add(a, b) {
  console.log('result:' + (this === global)); // result:true
  return a + b;
}

console.log('value:' + add(1, 2)); //value:3
```

### apply调用模式

apply方法让我们构建一个参数数组传递给调用函数。它允许我们选择this的值。apply方法接收两个参数，第一个是要绑定给this的值，第二个就是一个参数数组。

```js
	var array = [3, 4];
	var sum = add.apply(null, array); // sum值为7

	var statusObject = {
	  status:'A-OK'
	};
	var status =Quo.prototype.get_status.apply(statusObject); // status的值为'A-OK'
```

### apply和call的区别

```js
	foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3)
```

相同点:两个方法产生的作用是完全一样的  

不同点:方法传递的参数不同

```js
	function print(a, b, c, d) {
	  console.log(a + b + c + d);
	}

	function example(a, b, c, d) {
	  //用call方式借用print,参数显式打散传递
	  print.call(this, a, b, c, d);
	  //用apply方式借用print, 参数作为一个数组传递,
	  //这里直接用JavaScript方法内本身有的arguments数组
	  print.apply(this, arguments);
	  //或者封装成数组
	  print.apply(this, [a, b, c, d]);
	}

	//下面将显示”1234”
	example('1', '2', '3', '4');
```

## prototype

原型是一个对象，其他对象可以通过它实现属性继承。  

因为每个对象都有一个原型，对象的原型指向对象的父，而父的原型又指向父的父，我们把这种通过原型层层连接起来的关系撑为原型链。这条链的末端一般总是默认的对象原型。  	

一个对象的真正原型是被对象内部的属性(property)所持有。  

```js
	var Quo = function (status) {
	  this.status = status;
	};

	Quo.prototype.get_status = function () {
	  return this.status;
	};

	var myQuo = new Quo('confused');
	console.log(Object.getPrototypeOf(myQuo) === Quo.prototype); // true
	console.log(myQuo.__proto__ === Quo.prototype); // true
	console.log(myQuo.constructor.prototype === Quo.prototype); // true
```

函数Quo的原型属性(prototype)是一个对象，当这个函数被用作构造函数来创建实例时，该函数的原型属性将被作为原型赋值给所有对象实例。  

每个对象都会在其内部初始化一个属性，就是__proto__，当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去__proto__里找这个属性，这个__proto__又会有自己的__proto__，于是就这样一直找下去，也就是我们平时所说的原型链的概念。  

原型连接在更新的时候是不起作用的。当我们对某个对象做出改变时，不会触及该对象的原型。  

```js
	var Quo = function (status) {
	  this.status = status;
	};
	Quo.prototype.first = 'abc';

	var myQuo = new Quo('confused');
	console.log(myQuo.first); // abc
	myQuo.first = 'def';
	console.log(myQuo.first); // def
	console.log(Quo.prototype.first); // abc
```

原型连接只有在检索值的时候才能被用到。如果我们尝试去获取对象的某个值，且该对象没有此属性名，那么JavaScript会尝试着从其原型对象中获取属性值。如果那个原型对象也没有该属性值，那么再从它的原型中寻找，依此类推，直到该过程最后达到终点Object.prototype。如果想要的属性完全不存在于原型链中，那么结果就是undefined值。  

```js
	var Quo = function (status) {
	  this.status = status;
	};
	Quo.prototype.first = 'abc';

	var myQuo = new Quo('confused');
	console.log(myQuo.first); // abc
	console.log(myQuo.second); // undefined
```

原型关系是一种动态的关系。如果我们添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。   

```js
	var Quo = function (status) {
	  this.status = status;
	};

	var myQuo = new Quo('confused');
	console.log(myQuo.first); // undefined
	Quo.prototype.first = 'abc';
	console.log(myQuo.first); // abc
```

再来一张stackoverflow上的图：  
![stackoverflow](http://pic002.cnblogs.com/images/2012/322503/2012072014243377.png)

## constructor

当一个函数被创建时，Function构造器产生的函数对象会运行类似这样的一些代码：

```js
	this.prototype = {constructor: this};
```

新函数对象被赋予了一个prototype的属性，它的值是包括一个constructor属性，且属性值为该函数的对象。这个prototype对象是存放继承特征的地方。

```js
	var Quo = function (status) {
	  this.status = status;
	};
	console.log(Quo.prototype.constructor === Quo); // true
```

JavaScrip是基于原型继承的，新对象都会继承父的这个constructor属性，他们的constructor都指向父 

```js
	var Quo = function (status) {
	  this.status = status;
	};

	var myQuo = new Quo('confused');
	console.log(myQuo.constructor === Quo); // true
	console.log(Quo.constructor === Function); // true
```

为了将实例的构造器的原型对象暴露出来, 比如你写了一个插件,别人得到的都是你实例化后的对象, 如果别人想扩展下对象,就可以用instance.constructor.prototype 去修改或扩展原型对象

```js
	var Quo = function (status) {
	  this.status = status;
	};

	var myQuo = new Quo('confused');
	var myQuo2 = new Quo('confused');

	myQuo.constructor.prototype.get_status = function() {
	  return this.status;
	};

	console.log(myQuo.get_status()); // confused
	console.log(myQuo2.get_status()); // confused
```

## 继承

###伪类

JavaScript的原型存在着诸多矛盾。它的某些复杂的语法看起来就像那些基于类的语言，这些语法问题掩盖了它的原型机制。它不直接让对象从其他对象继承，反而插入了一条多余的间接层：通过构造器函数产生对象。  

当采用构造器调用模式，即用new前缀去调用一个函数时，函数执行的方式会被修改。如果new运算符是一个方法而不是一个运算符，它可能像下面这样执行:

```js
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
	var twoMammal = new Mammal('Herb the Mammal'); // twoMammal 'Herb the Mammal'
```

我们可以定义一个构造器并扩充它的原型：

```js
	var Mammal = function (name) {
	  this.name = name;
	};
	Mammal.prototype.get_name = function() {
	  return this.name;
	};
	Mammal.prototype.says = function () {
	  return this.saying || '';
	};
```

然后根据这个构造器创建一个实例：

```js
	var myMammal = new Mammal('Herb the Mammal');
	console.log('myMammal name:' + myMammal.get_name()); // myMammal name:Herb the Mammal
```

我们再构造一个伪类来继承Mammal，这是通过替换它的prototype为一个Mammal的实例来实现的：

```js
	var Cat = function (name) {
	  this.name = name;
	  this.saying = 'meow';
	};

	Cat.prototype = new Mammal();
	Cat.prototype.purr = function(n) {
	  var s = '';
	  for(var i = 0; i < n; i++) {
	    if(s) {
	      s += '-';
	    }
	    s += 'r';
	  }
	  return s;
	};
	Cat.prototype.get_name = function() {
	  return this.says() + ' ' + this.name;
	};

	var myCat = new Cat('Henrietta');
	console.log('says:' + myCat.says());
	console.log('purr:' + myCat.purr(5));
	console.log('myCat name:' + myCat.get_name());
```

上面的伪类继承模式本意是想向面向对象靠拢，但它随处可见直接修改prototype，看起来格格不入，我们可以自定义一些方法将这些prototype操作细节隐藏起来，使其看起来不那么怪异。

```js
	Function.prototype.method = function (name, func) {
	  this.prototype[name] = func;
	  return this;
	};
	Function.method('inherites', function (Parent) {
	  this.prototype = new Parent();
	  return this;
	});


	var Mammal = function (name) {
	  this.name = name;
	};
	Mammal.method('get_name', function () {
	  return this.name;
	});
	Mammal.method('says', function () {
	  return this.saying || '';
	});
	var myMammal = new Mammal('Herb the Mammal');
	console.log('myMammal name:' + myMammal.get_name());


	var Cat = function (name) {
	  this.name = name;
	  this.saying = 'meow';
	};
	Cat.inherites(Mammal);
	Cat.method('purr', function (n) {
	  var s = '';
	  for (var i = 0; i < n; i++) {
	    if (s) {
	      s += '-';
	    }
	    s += 'r';
	  }
	  return s;
	});
	Cat.method('get_name', function () {
	  return this.says() + ' ' + this.name;
	});
	var myCat = new Cat('Henrietta');
	console.log('says:' + myCat.says());
	console.log('purr:' + myCat.purr(5));
	console.log('myCat name:' + myCat.get_name());
```

我们调用构造函数的时候一定要在前面加上new前缀，不然的话this将不会被绑定到新的对象上面去，而是被绑定到全局对象上，这样不但没有扩充新的对象，而且还破坏了全局变量环境。所以所有的构造函数都约定命名成首字母大写的形式，这样在使用的时候能显著的提醒我们要给其加上new前缀。

### 原型

在一个纯粹的原型模式中，我们会摒弃类，转而专注于对象。基于原型的继承在概念上就是一个新对象可以继承一个旧对象的属性。 

我们先用对象字面量去构造一个有用的对象：

```js
	var myMammal = {
	  name: 'Herb the Mammal',
	  get_name: function () {
	    return this.name;
	  },
	  says: function () {
	    return this.saying || '';
	  }
	};
	console.log('myMammal name:' + myMammal.get_name()); // myMammal name:Herb the Mammal
```

一旦有了一个想要的对象，我们就可以利用Object.create方法构造出更多的实例来。  

```js
	var myCat = Object.create(myMammal);
	myCat.name = 'Henrietta';
	myCat.saying = 'meow';
	myCat.purr = function (n) {
	  var s = '';
	  for (var i = 0; i < n; i++) {
	    if (s) {
	      s += '-';
	    }
	    s += 'r';
	  }
	  return s;
	};
	myCat.get_name = function () {
	  return this.says() + ' ' + this.name;
	};
	console.log('says:' + myCat.says()); // says:meow
	console.log('purr:' + myCat.purr(5)); // purr:r-r-r-r-r
	console.log('myCat name:' + myCat.get_name()); // myCat name:meow Henrietta
```

### 函数化

上面的继承都有一个弱点是没法保护隐私，对象的所有属性都是可见的。我们无法得到私有变量和私有函数。函数化这种继承模式就可以解决这些问题。  

我们从构造一个生成对象的函数开始。我们以小写字母开头来命名它，因为它并不需要使用new前缀。该函数包括四个步骤。   

```
1、创建一个新对象。
2、有选择的定义私有实例变量和方法。
3、给新对象扩充方法。
4、返回那个新对象
```

```js
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
```