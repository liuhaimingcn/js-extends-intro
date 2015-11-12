# js-extends-intro
JavaScript的继承简介

在大多数编程语言中，继承都是一个重要的主题。  
在那些基于类的语言中（JAVA），继承（extends）是代码重用的一种形式，可以显著地减少软件开发的成本。  
在JAVA中对象是类的实例，并且类可以从另一个类继承。JavaScript是一门基于原型的语言，这意味着对象直接从其他对象继承。  
介绍JavaScript的继承之前先简单介绍一下JavaScript中几个重要的属性（this、prototype、constructor）,这些属性对于理解如何实现JavaScript中的继承起着至关重要的作用。

## this

JavaScript中的每个函数除了声明定义的形式参数，还接收了连个附加的参数：this和arguments。  
arguments是函数被调用时传递给它的参数列表。

```
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
  
```
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

```
	function add(a, b) {
	  console.log('result:' + (this === global)); // result:true
	  return a + b;
	}
	console.log('value:' + add(1, 2)); //value:3
```

这是一个语言设计上的一个错误，如果语言设计正确，那么当内部函数被调用时，this应该仍然绑定到外部函数的this变量。  
解决办法

```
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

```
function add(a, b) {
  console.log('result:' + (this === global)); // result:true
  return a + b;
}

console.log('value:' + add(1, 2)); //value:3
```

### apply调用模式

apply方法让我们构建一个参数数组传递给调用函数。它允许我们选择this的值。apply方法接收两个参数，第一个是要绑定给this的值，第二个就是一个参数数组。

```
	var array = [3, 4];
	var sum = add.apply(null, array); // sum值为7

	var statusObject = {
	  status:'A-OK'
	};
	var status =Quo.prototype.get_status.apply(statusObject); // status的值为'A-OK'
```

apply和call的区别

```
	foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3)
```

相同点:两个方法产生的作用是完全一样的  
不同点:方法传递的参数不同

```
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





























 
