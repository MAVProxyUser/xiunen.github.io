# 有趣的JS之JS小技巧
`Frontend` `Javascript`

求数组中的最大值和最小值
```javascript
var max = Math.max.apply(Array,  [1, 5, 2, 3]);
var min = Math.min.apply(Array, [4,2,8,1] );
```
获取一个对象的所有的key
```javascript
var keys = Object.keys({a:1, b:2});//=>["a","b"]
```
获得一个从数字 10到20的连续数组
```javascript
var arr = Array.apply(null, {length: 20+1}).map(Number.call, Number).slice(10);
var arr = Object.keys(Array.apply(null, {length: 20+1})).slice(10);
```
    
字符串换行
```javascript
var str = "hello\
            world\
          ";//每一行的最后添加“\”, 不会保留换行符
var str1 = `hello
            world`;//使用反引号（`）会保留换行符
```

数组求和
```javascript
var arr = [1, 3, 6, 10];
var sum1 = arr.reduce(function(currentValue, item){
    return currentValue + item;
});
var sum2 = eval(arr.join('+'));
```

变量交换值
```javascript
var a=1, b =2;
a=[b, b=a][0];//=>a=2, b=1

a=a+b;
b=a-b;
a=a-b;
```

数组去重
```javascript
[1,2,3,4].filter(function(item, index, self){
    return self.indexOf(item)===index;
});
```

数字分段
```javascript
('' + 123456).split('').reverse().map(function(item,index){
  return (index != 0 && index % 3 == 0) ? (item + ',') : item;
}).reverse().join(''); //123,456
```

数组转化成对象
```javascript
[
  {name: 'blabla', value: 'haha'},
  {name: 'blabla2', value: 'kk'}
].reduce(function(result, item){
  result[item.name] = item.value;
  return result;
},{});//=>{blabla:'haha', blabla2: 'kk'}
```

> Repost from [my CSDN Blog](http://blog.csdn.net/xiunen_z/article/details/51166389)
