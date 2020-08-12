// server.js
const jsonServer = require('json-server')
Stream = require('node-rtsp-stream')
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

stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://10.10.1.106/stream1',
  wsPort: 8000,
  ffmpegOptions: { // options ffmpeg flags
    '-stats': '', // an option with no neccessary value uses a blank string
    '-r': 30 // options with required values specify the value after the key
  }
})


server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running')
})