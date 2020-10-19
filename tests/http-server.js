// TODO: Possibly test script should be written as cleit requester + server response in one file
// with a bunch of different requests to test all of them.

// And send reqests manually only in case I need check some exact data or behavior.
// But it also should not be difficult, something like copy-paste.



const http = require('http');
// const https = require('https');
// const net = require('net');
// const url = require('url');
// const zlib = require("zlib");

const HTTPproxy = http.createServer((clientReq, clientRes) => {
  console.log('req');
  clientRes.end("OK\n", "utf8");
//   console.log('h', JSON.stringify(req.headers, ' ', 4));

//   // const hostnamezzz = 'http.destination.server.com';
//   const hostnamezzz = 'http.destination.server.com';
//   req.headers.host = hostnamezzz;
//   var url_ = url.parse(req.url);
//   console.log('*', req.url);
//   const options = {
//       hostname: hostnamezzz,
//       method: 'POST',
//       path: url_.path,
//       headers: req.headers
//    };
//    console.log(replaseResp);

//   if (replaseResp) {
//     res.setHeader('access-control-allow-credentials', 'true');
//     res.setHeader('access-control-allow-origin', '*');
//     res.setHeader('connection', 'keep-alive');
//     // res.setHeader('content-length', '6792');
//     res.setHeader('content-type', 'application/json;charset=utf-8');
//     res.setHeader('date', 'thu, 19 apr 2018 13:19:05 gmt');
//     res.setHeader('keep-alive', 'timeout=5, max=100');
//     res.setHeader('server', 'apache-coyote/1.1');
//     // res.write(resp);
//     res.statusCode = 502;
//     res.end();
//   } else {

//    const req2 = https.request(options, function(res2) {
//      console.log('res');
//      // res.pipe(res2);
//      const headerNames = Object.keys(res2.headers);
//      var isGzip = false;
//      headerNames.forEach(function(header) {
//        if (header === 'content-encoding') {
//          isGzip = true;
//          return;
//        }
//        res.setHeader(header, res2.headers[header]);
//      });
//      // res2.setEncoding();
//      var ddd = '';

//     var gunzip = zlib.createGunzip();
//     // if (isGzip) {
//     //   res2.pipe(gunzip);
//     //   res2 = gunzip;
//     // }

//     res2.on('error', (d) => {
//       console.log('----E ',d.toString());
//     });
//     res2.on('data', (d) => {
//       ddd += d;
//       // console.log('----7 ',d.toString());
//       res.write(d);
//     });
//     res2.on('end', () => {
//       console.log('----',ddd.toString());
//       history.push({
//         body: ddd.toString(),
//         direction: 'res',
//         proto: 'xhr'
//       });
//       res.end();
//     });
//   });


//     var options3 = {
//         hostname: 'localhost',
//         port: '3217',
//         method: 'POST',
//         path: url_.path,
//         headers: req.headers
//      };


//      const req3 = http.request(options, function(res3) {
//         res3.on('data', (d) => {
//           // console.log('----',d.toString());
//         });
//      });

//    req2.on('error', (e) => {
//     console.error(e);
//   });
//    req3.on('error', (e) => {
//     console.error(e);
//   });
//   req.on('data', (d) => {

//     history.push({
//       body: d.toString(),
//       direction: 'req',
//       proto: 'xhr'
//     });
//      req2.write(d);
//      req3.write(d);
//    });

//    req.on('end', (d) => {
//       req2.end();
//       req3.end();
//     });
//   }
});


HTTPproxy.listen(34010, function(){
  console.log('HTTP test server started listning.');
});
