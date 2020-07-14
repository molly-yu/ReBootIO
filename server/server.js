// server.js
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('./cameras.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000;
var db = require('./cameras.json')

server.use(jsonServer.bodyParser);
server.use(middlewares)

// Post request
server.post('/cameras/post', (req, res) => {
      let ip = req.body['ip'];
      if (ip != null) {
        let result = db.cameras.find(camera => {
          return camera.ip == ip;
        })
  
        if (result) {
          let {id, ...camera} = result;
          res.status(200).jsonp(camera);
        } else {
          res.status(400).jsonp({
            error: "Bad IP Address"
          });
        }
      } else {
        res.status(400).jsonp({
          error: "No valid IP Address"
        });
      }
    
  });
   
  server.get('/cameras', (req, res) => {
    if (req.method === 'GET') {
      let ip = req.query['ip'];
      if (ip != null) {
        let result = db.users.find(ip => {
          return camera.ip == ip;
        })
  
        if (result) {
          let {id, ...camera} = result;
          res.status(200).jsonp(camera);
        } else {
          res.status(400).jsonp({
            error: "Bad IP Address"
          });
        }
      } else {
        res.status(400).jsonp({
          error: "No valid IP Address"
        });
      }
    }
  });
  

server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running')
})