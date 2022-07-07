import {request} from 'request'

module.exports = (req:any, res:any) => {
  // proxy middleware options
  let prefix = "/api"
  if (!req.url.startsWith(prefix)) {
    return;
  }
  let target = "https://netease-cloud-music-api-theta-nine-20.vercel.app" + req.url.substring(prefix.length);

  var options = {
    'method': 'GET',
    'url': target,
    'headers': {
      'Authorization': res.headers['authorization']
    }
  };
  request(options, function (error:any, response:any) {
    if (error) throw new Error(error);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(response.body);
    res.end();
  });
}