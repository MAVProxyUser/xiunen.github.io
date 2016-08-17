# node.js学习要点
`Javascript` `Node.js`

Nodejs和npm的安装过程请自己百度，并且假设读者你已经基本掌握js知识，本文只写一下学习node.js的要点

## hello world

创建hello.js, 用node hello.js命令启动服务

```javascript
    var http = require("http");  
    http.createServer(function(req, res){  
        res.writeHeader(200,{"Content-Type":"text/html"});   
        res.write('hello world');   //输出hello world  
        res.end();  //调用end函数结束输出  
    }).listen(12345);//监听12345端口  
```
在浏览器中输入 `http://localhost:12345/` 访问

## 获取GET请求

```javascript
    var http = require("http");  
    var url = require("url");  
    var querystring = require("querystring");  
    http.createServer(function(req, res){  
        res.writeHeader(200,{"Content-Type":"text/html"});  
        res.write(req.url);     //req.url获取请求的URL  
        var url_obj = url.parse(req.url);       //解析url获取参数，url_obj.pahtname  
        console.log(url_obj);  
        var queries = querystring.parse(obj.query); //获取请求的参数对象  
        console.log(queries);  
        res.end();  
    }).listen(12345); 
```
在浏览器中输入`http://localhost:12345/?r=adc&q[0]=2&q[1]=3`, 得到如下结果：


![Node Get Result](/images/node-get.jpeg)

## 获取post参数

```javascript
var http = require("http");  
var querystring = require("querystring");  
http.createServer(function(req, res){  
    res.writeHeader(200,{"Content-Type":"text/html"});  
    res.write('<form method="post" action="/post?r=test"><input type="text" name="name"><input type="password" name="pwd"><input type="submit"></form>');  
    var post_data = "";  
    req.setEncoding("utf8");  
    req.addListener('data', function(postDataChunk) {//监听post提交  
            post_data += postDataChunk;  
        console.log("data:"+post_data);  
        });  
    req.addListener('end', function() {//post提交完毕  
        var queries = querystring.parse(post_data);  
        console.log(queries);  
        });   
    res.end();  
}).listen(12345);  
```
在浏览器输入`http://localhost:12345`, 出来输入表单，输入test, get点击提交按钮，得到如下结果:

![Node Post Result](/images/node-post.jpeg)

## 读写文件

整个文件读：

```javascript
var fs = require("fs");  
fs.readFile("a.txt",function(err,data){ //a.txt是要读的文件名，data是读出来的文件内容  
    if(err) throw err;  
    console.log(data);  
});  
```
整个文件写：
```javascript
var fs = require("fs");  
fs.writeFile("b.txt","hello world", function(err){  //b.txt表示写入的文件名，如果没有，就会创建这个文件，“hello world”是写入的内容，会覆盖掉老内容  
    if(err) throw err;  
});  
```

使用文件流读写文件
```javascript
var fs = require("fs");  
var fReadStream = fs.createReadStream("a.txt",{flags:"r",encoding:"utf8",mode:0666});  
fReadStream.on('data',function(data){  
  console.log("data:"+data);  
});  
fReadStream.on('end',function(){  
    console.log("read end");  
});  
var fWriteStream = fs.createWriteStream("b.txt",{flags:"a",encoding:"utf8",mode:0666});  
fWriteStream.write("write append");  
fWriteStream.end();  
```
flags 可以是以下值。
r ：以读取模式打开文件。
r+ ：以读写模式打开文件。
w ：以写入模式打开文件，如果文件不存在则创建。
w+ ：以读写模式打开文件，如果文件不存在则创建。
a ：以追加模式打开文件，如果文件不存在则创建。
a+ ：以读取追加模式打开文件，如果文件不存在则创建。

使用管道读写文件
```javascript
fReadStream.pipe(fWriteStream);  
fWriteStream.on('close',function(){  
  console.log('copy over');    
});  
```
详见[Nodejs读写文件介绍](http://www.csharpwin.com/dotnetspace/13093r4447.shtml)

## 上传文件
```javascript
var http = require("http");  
var formidable = require('formidable');  
var fs = require("fs");  
http.createServer(function(req, res){  
    res.writeHeader(200,{"Content-Type":"text/html"});  
    switch(req.url){  
        case "/x":  
            var form = new formidable.IncomingForm();  
            form.parse(req, function(err, fields, files){//get upload files with parameter files  
                //files.f 可以获得name="f"的文件的相关信息  
            });  
        break;  
        default:  
            res.write('<html>');  
            res.write('<head>');  
            res.write('</head>');  
            res.write('<body>');  
            res.write('<form action="x" method="post" enctype="multipart/form-data">');  
            res.write('<input type="file" name="f">');  
            res.write('<input type="submit">');  
            res.write('<form>');  
            res.write('</body>');  
            res.write('</html>');  
    }  
    res.end();  
}).listen(12306);  
```
详细参考[http://wangdf-jee.iteye.com/blog/1396734](http://wangdf-jee.iteye.com/blog/1396734)

用Express框架上传文件更简单，详细见：[http://stackoverflow.com/questions/17218506/file-upload-to-a-node-js-server](http://stackoverflow.com/questions/17218506/file-upload-to-a-node-js-server)

## 操作数据库

mysql
```javascript
var http = require("http");  
var sys = require("sys");  
var mysql = require("mysql");  
var conn = mysql.createConnection({  
    host:"localhost",  
    user:"root",  
    password:"123",  
    database:"node_test",  
    port:3306  
});  
conn.connect();  
conn.query("select * from test",function(err, rows, fields){//sql语句，可以是增删改查的sql，rows是返回的结果，fields是列相关的信息  
    if(err){  
        console.log("error");  
        conn.end();  
    }  
    console.log(rows);  
    console.log(fields);  
});  
conn.end();  
```
详细参考：[http://blog.fens.me/nodejs-mysql-intro/](http://blog.fens.me/nodejs-mysql-intro/)

mongodb
```javascript
var mongodb = require("mongodb");  
var server = new mongodb.Server("127.0.0.1",27017,{});  
var db = new mongodb.Db("node_test",server,{});  
db.open(function(err, client){  
    if(err){  
        return false;  
    }  
    var collection = new mongodb.Collection(client,'user');  
    collection.insert({x:1,y:"hello world",_id:123456});//插入  
    collection.insert({x:2,y:"hello somebody",_id:123456});//插入或更新  
    collection.remove({x:1});//删除  
//update可以有四个参数，第一个是要跟新的对象的查询参数，第二个是要跟新的key以及对应的value，第三个是upsert:true|false,是否在没有查找到对象时插入新对象，第四个multi:true|false, 是否更新多列  
    collection.update({x:2},{$set:{y:"hello kitty"}});   
    collection.find({x:1}).toArray(function(error, items){//查询，items为查询结果数组  
        console.log(items);  
    });  
      
});  
```
详见 [https://github.com/mongodb/node-mongodb-native](https://github.com/mongodb/node-mongodb-native)

## 常用框架

[Express](http://expressjs.com/)

[KOA](http://koajs.com/)

[Sails](http://sailsjs.org/)



