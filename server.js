const express = require('express')
var server = express()
server.use(express.static(__dirname+'/dist'))
server.listen(80,function(){
    console.log('已开启');
})