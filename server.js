const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// check NODE env
const isPROD = process.env.NODE_ENV === 'production';

// define app api routes
const users = require('./routes/api/users');

// initlize .env
dotenv.config();

const app = express();

// Logging middleware
app.use( morgan('dev') );

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = process.env.mongoURI;

// connect to MongoDB
mongoose
  .connect(db, { 
  	useNewUrlParser: true,
  	useFindAndModify: false,
  } )
  .then( () => console.log("MongoDB Coonected.") )
  .catch( err => console.log(err) );

app.use('/api/users', users);

// Serve static assets in production
if( isPROD ){
	// set Static folder
	app.use('/', express.static(path.join(__dirname,'public')) );
}

// use PORT variable from HEROKU env if available
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));