var express = require('express'),
	restful = require('node-restful'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

var app = express();

// Allow pass image string
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(methodOverride());

// Allow cross server script request
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
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

//mongoose.connect("mongodb://192.168.86.110/notee");
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
          content: String,
          image: String,
          lists: Array,
          urls: Array          
     }
});

var Notes = restful.model('notes', schema);
Notes.methods(['post', 'get', 'put', 'delete']);
Notes.register(app, '/api/notes');

app.get('/api/notes/:loggedInUser', function (req, res) {
  //var loggedInUser = req.headers.userId;
  Notes.find({ email: (req.params.loggedInUser) ? req.params.loggedInUser : '' }, function(err, notes){
    if(err) throw err;
    res.send(notes);  
  })
});

app.listen(3030);
console.log("Server is running at port 3030");


