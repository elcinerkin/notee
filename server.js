var express = require('express'),
	restful = require('node-restful'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

var app = express();
app.use(bodyParser());
app.use(methodOverride());

// Allow cross server script request
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

mongoose.connect("mongodb://localhost/notee");

var NoteSchema = mongoose.Schema({
	title: String,
	content: String
});

var schema = mongoose.Schema({
     email: String,
     createdDate: Date,
     category: String,
     note: {
          title: String,
          color: String,
          tags: Array,
          priority: Boolean,
          content: String,
          image: String,
          todo: Array,
          links: Array          
     }
});

var Notes = restful.model('notes', schema);
Notes.methods(['post', 'get', 'put', 'delete']);
Notes.register(app, '/api/notes');

app.listen(3030);
console.log("Server is running at port 3030");


