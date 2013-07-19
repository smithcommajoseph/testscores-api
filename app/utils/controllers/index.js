exports.sendApiData = function sendApiData(res, err, data) {
  if(err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(err));
  }
  else {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(data));
  }
  res.end();
};

exports.streamApiData = function streamApiData(res, stream) {
  var comma = false;
  res.writeHead(200, {'Content-Type': 'application/json'});
  stream
  .on('data', function (chunk) {
    res.write(JSON.stringify(chunk));
  })
  .on('error', function (err) {
  })
  .on('close', function () {
    res.end();
  });
};