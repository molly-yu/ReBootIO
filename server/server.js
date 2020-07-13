const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const items = require('./routes/api/items');

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// Use routes
app.use('/api/items', items);

//DB 
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors()); // middleware
app.use(express.json()); 

const uri = process.env.ATLAS_URI; // database uri from mongoDB
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
})

app.listen(port, () => console.log('Server started on port ${port}'));