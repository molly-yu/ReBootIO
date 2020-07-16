// server.js
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000;
//  const cameras = require('../routes/api/cameras');
server.use(jsonServer.bodyParser);
server.use(middlewares)
// server.use('/cameras', cameras)

// server.get('/cameras', (req, res) => {
//   Camera.find()
//   .then(cameras => res.json(cameras))
//   .catch(err => res.status(400).json('Error: ' + err));
// });

// @route POST api/cameras
// @desc Create A Post
// @access Public

// server.post('/cameras', (req, res) => {
//   const newCamera = new Camera({
//       ip: req.body.ip,
//       user: req.body.user,
//       pass: req.body.pass
//   });
//   newCamera.save().then(camera => res.json(camera)).catch(err => res.status(400).json('Error: ' + err));
// });


server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running')
})