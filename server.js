var express = require('express'),
	restful = require('node-restful'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

var app = express();
app.use(bodyParser());
app.use(methodOverride());

mongoose.connect("mongodb://localhost/notee");

var NoteSchema = mongoose.Schema({
	title: String,
	content: String
});
var Notes = restful.model('notes', NoteSchema);
Notes.methods(['post', 'get', 'put', 'delete']);
Notes.register(app, '/api/notes');

app.listen(3030);
console.log("Server is running at port 3030");


