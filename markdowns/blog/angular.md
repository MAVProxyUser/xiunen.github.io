# Angular使用教程
`Frontend` `Javascript` `Angular`

Angular的核心思想是通过修改model来控制页面的变化，这是和jquery的最大的不同之处，jquery是通过修改dom来控制页面变化的。

## App
首先需要在代码中声明应用名称，使用ng-app,例如`index.html`中：
```html
    <html ng-app="test">
    </html>
```
当然，需要在页面中引入angularjs。

然后在js中用angular初始化这个应用,例如`js/index.js`中。
```js
    var app = angular.module('test',[]);//第二个参数不能省略
```

## controller和模板
首先需要在模板中生命ctrl,使用`ng-controller="SomeCtrl"`这样的指令。如在`index.html`中：
```html
    <div ng-controller="LinksCtrl">
        Hello, {{name}}
    </div>
```
然后需要使用`app.controller`来设置控制该区域的页面变化。如在`js/index.js`中：
```js
    app.controller('LinksCtrl', function($scope){
        $scope.name = "Abot Chen";
    });
```
上面代码中，$scope这个参数是固定的，不能改成其他名字，后面会看到很多'$'开头的变量，名字都是固定的。angular使用了依赖注入的方式来传入实例变量。

$scope的属性和函数可以在页面中使用。使用$scope变量有两种方法，使用双花括号`{{}}`或者使用`ng-bind`:
```html
    <div>{{name}}</div>
    <div ng-bind="name"></div>
```
推荐使用`ng-bind`，否则在js还没有加载完成之前，会出现很多花括号。

### 模板中使用循环
循环使用`ng-repeat`指令,在`js/template.js`绑定数据`$scope.items=[]`, 在`html/template.html`使用数据，如下：
```html
    <ul>
        <li ng-repeat="item in items">
            <a href="mailto:{{item.email}}">
                {{$index}} {{item.name}}
            </a>
        </li>
    </ul>
```
$index是ng-repeat内置变量，其他的参考[ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat)

### 模板中使用判断
判断使用`ng-if="表达式"`，angular模板中不存在else,如果是多条件分支，则需要些多个`ng-if`的元素。
```html
    <div ng-if="level > 3">Level Greater Than 3</div>
    <div ng-if="level <= 3">Level Less Than Equal 3</div>
```
当然，多条件分支还可以使用`ng-switch`指令，`ng-switch`共需要3个。`ng-switch="表达式"`,`ng-switch-when="匹配值"`,`ng-switch-default="默认值"`.
```html
    <div ng-switch="month">
        <div ng-switch-when="5">May</div>
        <div ng-switch-when="6">June</div>
        <div ng-switch-default>Other Month</div>
    </div>
```

### 如何从页面上获取用户输入
使用`ng-model="modelname"`指令，用户输入响应的数据时，对应的输入值会被赋值到`$scope`上。
```html
    <!--普通input-->
    <input type="text" ng-model="userinput">
    <span>You input:{{userinput}}</span>
    <!--Radio-->
    <input type="radio" ng-model="color" value="red">Red
    <input type="radio" ng-model="color" value="green">Green
    <div>Color is {{color}}</div>
    <!--Checkbox-->
    <input type="checkbox" ng-model="lang.php" value="PHP">Jack
    <input type="checkbox" ng-model="lang.js" ng-true-value="JavaScript" ng-false-value="JS"> Javascript
    <div>PHP checked: {{lang.php}}</div>
    <div>JS checked: {{lang.js}}</div>
```
在这这里输入的时候，发现`You input:`
后面的内容是实时变化的。这是由于angular的model和view是双向绑定的，我们输入的时候，就已经在修改model的值了。所以，如果其他地方设置`$scope.userinput='xxxx'`也会修改输入框里的值。
```js
    console.log($scope.userinput);
```

### 事件捕捉
事件捕捉使用`ng-{对应的事件名称}={响应函数(输入参数1,输入参数2,...)}`, 如`ng-click`,`ng-submit`,`ng-change`等。
```html
    <a href="" ng-click="click_link(10)">点我</a>
```
```js
    $scope.click_link = function(n) {
        alert('输入参数是' + n);
    }
```

## Service

定义service有三种方式，使用`app.service()`函数、使用`app.factory()`函数、使用`app.value()`函数：

参考`js/service.js`
```js
    app.service('SomeService1', function(){
        return {
            someFunc: function(){},
            someVar: "xxx"
        };
    });//第二参数必须是函数，在这个服务第一次注入到其他controller或者service的时候就会调用，即服务的初始化
    app.factory('SomeService2',function(){
        return {
            someFunc: function(){},
            someVar: "xxx"
        };
    });//第二参数必须是函数，在这个服务第一次注入到其他controller或者service的时候就会调用，即服务的初始化
    app.value('SomeService3',{
        someFunc: function(){},
        someVar:"xxx"
    });//第二个函数可以是具体的值，对象，或者函数。如果是函数，只有在调用的时候才执行
```
调用方式如下：
```js
    app.controller('TestCtrl',function($scope, SomeService1, SomeService2, SomeService3){
        SomeService1.someFunc();
        SomeService2.someFunc();
        SomeService3.someFunc();
    })
```

常用内置service

`$http` 主要用来做ajax请求

`$location` 封装了`location`对象

`$q` 主要用做异步请求的promise

`$routeParams` 获取url参数


## 指令Directive

定义指令使用 `app.directive('directiveName',function(){})`。其中`directiveName`必须使用驼峰式命名，在模板中使用的使用时则使用类似`directive-name`这样的中划线式的。
js参考`js/directive`,如：
```js
    app.directive('customDirective', function(){
        return {
            restrict: 'E',
            template: '<div>This is a custom directive</div>'
        };
    });
```
模板参考`html/directive.html`,如：
```html
    <custom-directive></custom-directive>
```
restrict的属性值有四个,如下

E 指令匹配标签名, 如上面的`<custom-directive></custom-directive>`

A 指令匹配属性名称， 如`<div custom-directive="hello"></div>`

C 指令匹配class, 如`<div class="custom-directive"></div>`

M 指令匹配注释，如`<!-- custom-directive -->`

restrict可以设置多种匹配模式，如 `restrict:"AEC"`,可以匹配标签名，属性，class。

template是用于指定模板。

templateUrl用于指定模板的路径。如果template和templateUrl同时指定，将会使用template的值。

link:function(scope, elem, attr){} 可以认为是指定的初始化函数。scope是指当前应用的作用域，elem是指当前元素，attr是一个包括当前元素所有属性的对象。

常用内置指令：
    
    ng-app
    ng-model
    ng-controller
    ng-view
    ng-src
    ng-link
    ng-href
    ng-if
    ng-repeat
    ng-init
    ng-class
    ng-show
    ng-hide
    ng-bind


## 过滤器
过滤器使用`app.filter`来定义，如下：
```js
    app.filter('filterName', function(){
        return function(input,arg1,arg2){
            return arg1 + input;
        }
    });
    app.controller('TestCtrl',function($scope){
        $scope.greeting = 'world';
    });
```
使用过滤器。
```html
    <div ng-controller="TestCtrl">
        {{greeting|filterName:"Hello "}} <!-- 显示： Hello world -->
    </div>
```

## 组件

组件使用`app.component('componentName',config)`来定义。可以参考`js/component.js`
```javascript
    app.component('userComment',{
        template: '<div>{{$ctrl.username}}:{{content}}</div>',
        bindings: {
            username: ' < '
        },
        controller: function($scope){
            $scope.content = "DJI is best uav manufacturor";
        }
    });
```
`template`用于配置组件的模板

`templateUrl`用于配置组件的模板的路径

`controller`是控制该组件的controller，其$scope只适用于本身的组件

`bindings`用于配置从外面接收参数的属性和调用父控制器的方法等。

`=`是双向绑定的，无论是component中改动还是controller中改动，都会对使用model的部分产生影响。

`<` 是单向绑定的，在controller中改动model会影响到component里的对应值，但是在component中修改model的话，只会影响component中的model，不会对component之外的controller中的其他部分产生影响。

`@`接收的是组件的属性值字符串，例如 `<component-name nickname="item"></component-name>`, nickname配置的是`@`的话，nickname的值就是'item'，而不是controller的变量的值。

`&`一般用来调用controller的函数


组件使用`<component-name></component-name>`调用
```html
    <component-name></component-name>
```
组件和指令有所区别，主要如下：
    
    指令有多种匹配方式，组件只匹配标签名称。
    指令的作用域是调用的controller，组件的作用域是组件自己的controller。
    指令用link函数来初始化指令，组件是controller函数来初始化。


## 配置
    
app.config()
