# 最全的JS数组函数方法介绍
`Frontend` `Javascript`

## 数组尾部追加 push
```javascript
var arr = [1,2,3];
arr.push(4);        //arr = [1,2,3,4]  
var arr = [1,2,3];
arr.push(4,5,6);    //arr = [1,2,3,4,5,6]  
var arr = [1,2,3];
arr.push([4,5,6]);  //arr = [1,2,3,[4,5,6]]  
```

push方法有返回值，返回值为数组的长度

## 数组尾部删除 pop
```javascript
var arr = ["a","b","c"];  
arr.pop();      // arr = ["a","b"]  
```

pop方法的返回值是删除元素的值，上述代码中的返回值是"c"

## 数组头部添加 unshift
```javascript
var arr = ["a","b","c"];  
arr.unshift("d");       //arr = ["d","a","b","c"]  
var arr = ["a","b","c"];  
arr.unshift("d","e");   //arr = ["d","e","a","b","c"]  
var arr = ["a","b","c"];  
arr.unshift(["d","e"]); //arr = [["d","e"],"a","b","c"]  
```

unshift方法的返回值是数组的长度

## 数组头部删除 shift
```javascript
var arr = ["a","b","c"];  
arr.shift();        //arr = ["b","c"]  
```
shift方法的返回值是删除元素的值

## 删除指定位置的，并且/或者在指定位置插入元素 splice
```javascript
var arr = ["a","b","c","e","f"];  
arr.splice(1);      //删除从index=1开始后面的所有元素. arr = ["a"]  
  
var arr = ["a","b","c","e","f"];  
arr.splice(1,2);    //删除从index=1开始的两个元素. arr = ["a","e","f"];  
  
var arr = ["a","b","c","e","f"];  
arr.splice(1,0);    //第二个参数为0时不删除元素. arr = ["a","b","c","e","f"];  
  
var arr = ["a","b","c","e","f"];  
arr.splice(1,2,"h","j","l");    //删除从index=1开始的两个元素, 并在index=1处插入第三个参数开始的所有元素. arr = ["a", "h", "j", "l", "e", "f"];  
  
var arr = ["a","b","c","e","f"];    //不删除元素，在index=1处插入第三个参数开始的所有元素. ["a", "h", "b", "c", "e", "f"]   
arr.splice(1,0,"h");  
  
var arr = ["a","b","c","e","f"];  
arr.splice(1,0,["h","j"]);      //插入数组，则整个数组当作一个元素. arr = ["a", ["h","j"], "b", "c", "e", "f"]   
```
splice返回一个数组，数组是由删除元素构成的。如果splice的第二个参数为0，则返回的数组里没有元素。

## 数组反转 reverse
```javascript
var arr = ["a","b","c"];  
var rarr = arr.reverse();   //arr = ["c","b","a"], rarr = ["c","b","a"];  
```
reverse的返回值是反转后的数组

## 数组排序 sort
```javascript
var arr1 = [2,3,1,11];  
arr1.sort();
// arr1 = [1, 11, 2, 3]   
var arr2 = ["2","3","1","11"];  
arr2.sort();
// arr2 = ["1", "11", "2", "3"]   
var arr3 = ["b","a","c","3","1","2"];  
arr3.sort();
// arr3 = ["1", "2", "3", "a", "b", "c"]  
var arr4 = ["banana","apple","orange","opai"];  
arr4.sort();
// arr4 = ["apple", "banana", "opai", "orange"] ;  
var arr5 = ["美国","中国","俄罗斯","日本"];  
arr5.sort();
//["中国", "俄罗斯", "日本", "美国"]   
var arr6 = [{key:"small",name:"world"},{key:"big",value:"china"},{key:"mini",name:"japan"}];  
arr6.sort();
//arr6未进行排序  
arr6.sort(function(a,b){  
    return a.key>b.key?1:-1;  
});
// arr6  = [{{key:"big",value:"china"},{key:"mini",name:"japan"},key:"small",name:"world"}];  
```
基本类型元素，排序逐个字母按照ascii码值排序，并且数字会转化成数组。对于对象类型，则进行排序；排序可以自定义排序函数，自定义函数返回值大于0，则元素交换，否则不交换。

以上7个函数均会修改数组本身的值。

## 数组追加 concat
```javascript
var arr = [1,2,3];  
var newarr = arr.concat(7,8);   // arr = [1,2,3] newarr = [1,2,3,7,8]  
  
var arr = [1,2,3];  
var newarr = arr.concat([5,6]); // arr = [1,2,3] newarr = [1,2,3,5,6]  
  
var arr = [1,2,3];  
var newarr = arr.concat([5,6,[7,8]]);   // arr = [1,2,3] newarr = [1,2,3,5,6,[7,8]]  
```
追加不改变被追加数组的值，返回追加后的数组；追加多个元素和追加一个数组的效果是一样的

## 数组合并成字符串 join

```javascript
var ret = arr.join("&");    // arr = [1,2,3] ret = "1&2&3"  
  
var arr = [1,2,3,[4,5]];  
var ret = arr.join("&");    // arr = [1,2,3,[4,5]] ret = "1&2&3"  
  
var arr = [1,2,3,{hi:"world"}];  
var ret = arr.join("&");    // arr = [1,2,3,{hi:"world"}] ret = "1&2&3"  
```
join方法返回组合后的字符串，并且不拼接非基本数据类型。

## 获取数组片段 slice
```javascript
var arr = [1,2,3,4,5,6,7,8];  
var ret = arr.slice(2,3);       //ret = [3]
var ret11 = arr.slice(3,2);     //ret=[];  
var ret12 = arr.slice(3,-2);    //ret=[4,5,6]  
var ret13 = arr.slice(3,-5);    //ret=[]  
var ret14 = arr.slice(-2,3);    //ret=[]  
var ret15 = arr.slice(-7,3);    //ret=[2,3]  
var ret21 = arr.slice(3);       //ret=[4,5,6,7,8]  
var ret22 = arr.slice(-3);      //ret = [6,7,8] 
```
slice如果是一个参数，则返回从指定位置到结束的元素组成的数组；如果是两个参数，则第一个参数时开始位置，第二个参数时结束位置；如果第一个或者第二个参数时负数，则表示倒数位置。例如-7，表示倒数第7个位置，如果总共8个元素，则表示第二个元素。

## 转换成字符串 toString
```javascript
var arr = [1,12,4];  
var ret = arr.toString();   // ret = 1,12,4  
```

## 获取元素第一次出现的位置 indexOf
```javascript
var arr = ["a","b","c","d","a","e","c","f"];  
var ret1 = arr.indexOf("a");     //ret = 0  
var ret2 = arr.indexOf("a",2);   //ret = 4  
var ret3 = arr.indexOf("a",-2);  //ret = -1  
var ret4 = arr.indexOf("a",-6);  //ret = 4  
var ret5 = arr.indexOf("a",-10); //ret=0  
```
indexOf找不到所需的元素时，返回-1； 从指定位置开始往后找元素第一次出现的位置，如果第二个参数为空的话，默认为0；

## 从后往前获取指定元素第一次出现的位置 lastIndexOf
```javascript
var arr = ["a","bbb","c","d","a","e","c","f"];  
var ret1 = arr.lastIndexOf("a");     //ret = 4  
var ret2 = arr.lastIndexOf("a",2);   //ret = 0  
var ret3 = arr.lastIndexOf("a",-2);  //ret = 4  
var ret4 = arr.lastIndexOf("a",-6);  //ret = 0  
var ret5 = arr.lastIndexOf("a",-10); //ret = -1  
```
lastIndexOf找不到所需的元素时，返回-1；从指定位置开始往前找元素第一次出现的位置，如果第二个参数为空的话，默认是数组的长度。

## 数组循环 forEach
```javascript
var arr = [5,2,7,,0,8,4], b = 0;  
var ret1 = arr.forEach(function(item, index, thisArr){  
    // this = {hello:"world"};  
    // item 元素的值  
    // 元素在数组中的下标  
    // 数组  
    b ++;  
},{hello:"world"});     // b = 6  
```
forEach没有返回值，不提供退出循环的。forEach有个好处是不访问空元素，如上例中第四个元素没有，直接跳过了。

##数组循环，可以条件退出 every
every方法和forEach类似，不过every中的回调函数如果返回false、0或者不返回时，循环中断，every函数的返回值是false; 其他情况，every继续循环，返回值是true；

## 判断数组中是否存在某个元素 some
```javascript
var b = 0;  
var passed = [2, 5, 8, 1, 4].some(function(element, index, array) {  
    b++;  
    return element >= 10;  
});// passed=false, b = 5  
var b = 0;  
  
passed = [12, 5, 8, 1, 4].some(function(element, index, array) {  
    b++  
    return element >= 10;  
});// passed=true, b = 1  
```
some方法是every方法的一种实现，只不过返回值恰好和every相反

## 数组元素筛选 filter
```javascript
var filtered = [12, 5, 8, 130, 44].filter(function(element) {  
    return element >= 10;  
}); // filtered = [12, 130, 44]  
```
filter是forEach的一种实现，只不过filter把符合条件的元素返回来了

## 数组循环并创建新数组 map
```javascript
var ret = [12, 5, 8, 130, 44].map(function(element) {  
    return element + 10;  
}); // ret = [22, 15, 18, 140, 54] 
```
map是forEach的一种实现，只不过map把每个元素运算之后构成的新素组返回来了

## 循环中获取上一次计算的结果 reduce
```javascript
var arr = ["a","bc","def","g"];  
var ret = arr.reduce(function(prev, cur, index, _arr){  
    console.log(prev, cur);  
    return cur;  
});     // ret = "g"  
//打印如下  
//a bc  
//bc def  
//def g   
var arr = ["a","bc","def","g"];  
var ret = arr.reduce(function(prev, cur, index, _arr){  
    console.log(prev, cur);  
    return cur;  
},"hello"); // ret = "g"  
//打印如下  
//hello a  
//a bc  
//bc def  
//def g   
```
reduce的返回值是最后一次运算的结果， 它的回调函数中的第一个参数是上次运算的结果，第二个是当前元素的值，第三个是当前下表，第四个是数组。

## 逆循环中中获得上一次计算的结果， reduceRight
这个函数的原理其实就是复制数组并将其reverse，然后再reduce。

