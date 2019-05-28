const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// define app api routes
const users = require('./routes/api/users');

const app = express();

// Logging middleware
app.use( morgan('dev') );

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

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
if(process.env.NODE_ENV === production){
	// set Static folder
	app.use('/', express.static(path.join(__dirname,'public')) );
}

// use PORT variable from HEROKU env if available
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));