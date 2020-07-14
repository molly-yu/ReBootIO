const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const CameraSchema = new Schema({
    ip:{
        type: String,
        required:true
    },
    user:{}
});

module.exports = Camera = mongoose.model('camera', CameraSchema);