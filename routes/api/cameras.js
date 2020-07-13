const express = require('express');
const router = express.Router();


// Camera Model
const Camera = require('../../models/Camera');

// @route GET api/cameras
// @desc Get all cameras
// @access Public
router.get('/', (req, res) => {
    Camera.find()
    .sort({date:-1})
    .then(cameras => res.json(cameras));
});

// @route POST api/cameras
// @desc Create A Post
// @access Public
router.post('/', (req, res) => {
    const newCamera = new Camera({
        ip: req.body.ip
    });
    newCamera.save().then(camera => res.json(camera));
});

// @route DELETE api/cameras/:id
// @desc Delete A Post
// @access Public
router.delete('/:id', (req, res) => {
    Camera.findById(req.params.id)
    .then(camera => camera.remove().then(() => res.json({success:true})))
    .catch(err => res.status(404).json({success:false}));
});


module.exports = router;