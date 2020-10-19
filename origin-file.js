const history = [];

const resp = "{\"globalErrors\":[{\"system\":\"ABC\",\"code\":503,\"message\":\"Global Maintenance Mode\"}],\"status\":\"ERROR\"}"
var replaseResp = false;

const WebSocket = require('ws');

// const ws = new WebSocket('wss://ws.destination.server.com/ws-proxy/ws/api');
const ws = new WebSocket('wss://ws.destination.server.com/ws-proxy/ws/api');

var readyc = false;
var readys = false;
ws.on('open', function open() {
  readyc = true;
  console.error('new serv');
  // ws.send('something');
});

ws.on('message', function incoming(data) {
  history.push({
    body: data,
    direction: 'res',
    proto: 'ws'
  });
  if (!readys) return;
  wsc.send(data)
});


const wss = new WebSocket.Server({ port: 8124 });
var wsc = {};

wss.on('connection', function connection(wsc_) {
  wsc = wsc_;
  readys = true;
  console.error('new con');
  wsc.on('message', function incoming(message) {
    history.push({
      body: message,
      direction: 'req',
      proto: 'ws'
    });
    if (replaseResp) {
      var pm = JSON.parse(message);
      pm.status = "success";
      pm.stackTrace = null;
      pm.errorMessage = null;
      pm.payload = JSON.parse(resp);
      wsc.send(JSON.stringify(pm));
    } else {
      if (!readyc) return;
      ws.send(message);
    }
  });

});

ws.on('error', function(err) {
  console.error('1   ', err);
});
wss.on('error', function(err) {
  console.error('2   ', err);
});



const http = require('http');
const https = require('https');
const net = require('net');
const url = require('url');
const zlib = require("zlib");

const proxy = http.createServer((req, res) => {
  console.log('req');
  console.log('h', JSON.stringify(req.headers, ' ', 4));

  // const hostnamezzz = 'http.destination.server.com';
  const hostnamezzz = 'http.destination.server.com';
  req.headers.host = hostnamezzz;
  var url_ = url.parse(req.url);
  console.log('*', req.url);
  const options = {
      hostname: hostnamezzz,
      method: 'POST',
      path: url_.path,
      headers: req.headers
   };
   console.log(replaseResp);

  if (replaseResp) {
    res.setHeader('access-control-allow-credentials', 'true');
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('connection', 'keep-alive');
    // res.setHeader('content-length', '6792');
    res.setHeader('content-type', 'application/json;charset=utf-8');
    res.setHeader('date', 'thu, 19 apr 2018 13:19:05 gmt');
    res.setHeader('keep-alive', 'timeout=5, max=100');
    res.setHeader('server', 'apache-coyote/1.1');
    // res.write(resp);
    res.statusCode = 502;
    res.end();
  } else {

   const req2 = https.request(options, function(res2) {
     console.log('res');
     // res.pipe(res2);
     const headerNames = Object.keys(res2.headers);
     var isGzip = false;
     headerNames.forEach(function(header) {
       if (header === 'content-encoding') {
         isGzip = true;
         return;
       }
       res.setHeader(header, res2.headers[header]);
     });
     // res2.setEncoding();
     var ddd = '';

    var gunzip = zlib.createGunzip();
    // if (isGzip) {
    //   res2.pipe(gunzip);
    //   res2 = gunzip;
    // }

    res2.on('error', (d) => {
      console.log('----E ',d.toString());
    });
    res2.on('data', (d) => {
      ddd += d;
      // console.log('----7 ',d.toString());
      res.write(d);
    });
    res2.on('end', () => {
      console.log('----',ddd.toString());
      history.push({
        body: ddd.toString(),
        direction: 'res',
        proto: 'xhr'
      });
      res.end();
    });
  });


    var options3 = {
        hostname: 'localhost',
        port: '3217',
        method: 'POST',
        path: url_.path,
        headers: req.headers
     };


     const req3 = http.request(options, function(res3) {
        res3.on('data', (d) => {
          // console.log('----',d.toString());
        });
     });

   req2.on('error', (e) => {
    console.error(e);
  });
   req3.on('error', (e) => {
    console.error(e);
  });
  req.on('data', (d) => {

    history.push({
      body: d.toString(),
      direction: 'req',
      proto: 'xhr'
    });
     req2.write(d);
     req3.write(d);
   });

   req.on('end', (d) => {
      req2.end();
      req3.end();
    });
  }
});


proxy.listen(3216, function(){
  console.log('listen');
});








// Create an HTTP tunneling proxy
const fakeBack = http.createServer((req, res) => {


  req.on('data', (d) => {
    // console.log('+++',d.toString());
   });
   // console.log('***', req.url)

   // res.pipe(req2);
});


fakeBack.listen(3217, function(){
  console.log('listen++');
});






// Create an HTTP tunneling proxy
const front = http.createServer((req, res) => {


  // req.on('data', (d) => {
  //   // console.log('+++',d.toString());
  //  });
   // console.log('***', req.url)

   // res.pipe(req2);
   // if (req.url === '/') {
   //   replaseResp = !replaseResp;
   // }
   console.log(replaseResp, req.url);
   res.write(JSON.stringify(history, ' ', 4));
   res.end();
});


front.listen(3218, function(){
  console.log('listen++++');
});