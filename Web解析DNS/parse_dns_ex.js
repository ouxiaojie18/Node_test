var http = require('http'), //服务器创建
    dns = require('dns'),   //DNS查询，主要负责解析当前DNS域名，返回DNS服务器IP地址
    fs = require('fs'),     //文件操作
    url = require('url'),   //url处理
    querystring = require('querystring');   //字符串处理，处理前端传回的字符串解析

// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'text/html'});
//     var readPath = __dirname+'/'+url.parse('index.html').pathname;
//     var indexPage = fs.readFileSync(readPath);
//     res.end(indexPage);
// }).listen(3001,"127.0.0.1");

http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    req.setEncoding("utf8");//设置返回客户端页面的数据格式，如果不设置可能会出现乱码
    res.writeHead(200,{'Content-Type':'text/html'});
    router(res,req,pathname);//调用router方法来处理url路由
}).listen(3001,"127.0.0.1");

function router(res,req,pathname){
    switch(pathname){
        case "/parse":
            parseDns(res,req);
            break;
        default:
            goIndex(res,req);
    }
}

function goIndex(res,req){
    var readPath = __dirname+'/'+url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    res.end(indexPage);

}

function parseDns(res,req){
    var postData="";
    req.addListener("data",function(postDataChunk){
        postData+=postDataChunk;
    });
    req.addListener("end",function(){
        var retData = getDns(postData,function(domain,addresses){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(`
            <html>
                <head>
                    <meta http-equiv="content-type" content="text/html;charset=utf-8">
                </head>
                <body>
                <div style='text-align: center'>
                    Domain:<span style='color:red'>${domain}</span>
                    IP:<span style='color:red'>${addresses.join(',')}</span>
                </div>
                </body>
            </html>
            `)
        });
        return;
    })
}

function getDns(postData,callback){
    var domain = querystring.parse(postData).search_dns;//应用querystring模块来获取post数据中键值为search_dns的值
    dns.resolve(domain,function(err,addresses){
        if(!addresses){
            addresses=['不存在域名']
        }
        callback(domain,addresses);
    });
}