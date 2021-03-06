var express = require("express");
var path = require("path")
var fs = require("fs")
var router = require('./api/router')
var app = express();
var bodyParser = require('body-parser')
let port = 8888;

app.use(express.static(path.join(__dirname, 'src')));

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({   
    extended: true
}));
app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));

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

app.get('/admin', function (req, res) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    fs.readFile('./admin.html', null, function(error, data) {
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


app.use('/', router)

app.get('/geojson', function (req, res) {
    
    res.sendFile(path.resolve("src/data/vietnam.geojson")) 
});

app.listen(port,function(){
    console.log("server is listening on port: ",port)
})
