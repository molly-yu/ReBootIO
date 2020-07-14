const express = require('express');
const router = express.Router();

// Camera Model
const Camera = require('../../server/cameras.json');

// @route GET api/cameras
// @desc Get all cameras
// @access Public
router.get('/cameras', (req, res) => {
    Camera.find()
    .then(cameras => res.json(cameras));
});

// @route POST api/cameras
// @desc Create A Post
// @access Public
router.post('/cameras', (req, res) => {
    const newCamera = new Camera({
        ip: req.body.ip,
        user: req.body.user,
        pass: req.body.pass
    });
    newCamera.save().then(camera => res.json(camera));
});

// @route DELETE api/cameras/:id
// @desc Delete A Post
// @access Public
router.delete('/cameras/:id', (req, res) => {
    Camera.findById(req.params.id)
    .then(camera => camera.remove().then(() => res.json({success:true})))
    .catch(err => res.status(404).json({success:false}));
});


module.exports = router;