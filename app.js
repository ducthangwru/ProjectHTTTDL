var express = require("express");
var path = require("path")
var fs = require("fs")
var router = require('./api/router')
var app = express();
let port = 8888;

//public folder src lên (check bằng cách bật f12 lên trình duyệt => source)
app.use(express.static(path.join(__dirname, 'src')));

//Thiết lập nếu nhập dạng localhost:8888/ thì là trả về file index.html
app.get('/', function (req, res) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    fs.readFile('./index.html', null, function(error, data) {
        if(error)
        {
            res.writeHead(404)
            res.write("Page not found")
        }
        else
            res.write(data)
        
        res.end()
    })
})

//tạo đường dẫn API từ file router.js ở folder api
app.use('/', router)

//nếu gửi lên localhost:8888/geojson thì trả về file geojson
app.get('/geojson', function (req, res) {
    
    res.sendFile(path.resolve("src/data/vietnam.geojson")) 
});

//nghe port thôi nè
app.listen(port,function(){
    console.log("server is listening on port: ",port)
})
