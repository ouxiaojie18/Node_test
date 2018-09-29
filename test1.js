// Q1:
// var http = require('http');
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.end('you are so good\n');
// }).listen(1337,"127.0.0.1")
// console.log('Server running at http://127.0.0.1:1337/');



//Q2
// var http = require('http');
// http.createServer(function(req,res){
//     var retHtml="<html><head><title>Node.js Test</title><head><body><div>Hi Node,I like you so much</div></body></html>"
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.end(retHtml);
// }).listen(1337,"127.0.0.1")
// console.log('Server running at http://127.0.0.1:1337/');


//Q3
var fs = require('fs');
// fs.readFile('index.json',function(error,data){    //读取文件，回调函数第一个参数表示错误信息，第二个参数为读取的文本内容
//     if(error){
//         console.log(error);
//     }else{
//         console.log('end async read');    //异步读取结束
//         console.log(data);
//     }
// });
function getFileData(callback){
    fs.readFile('index.json',function(error,data){
        callback(data);
        // if(error){
        //     console.log(error);
        // }else{
        //     console.log('end async read');    //异步读取结束
        //     console.log(data);
        // }
    })
}

function returnData(callback){
    getFileData(function(data){
        setTimeout(function(){
            callback(data);
            // console.log(data);
        },1000)
    })
}

returnData(function(data){
    console.log(data);
})