// set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var router = express.Router();
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration

mongoose.connect('mongodb://Sara:SharifWedding@jello.modulusmongo.net:27017/erA6ryna');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model
var Rsvp = mongoose.model('Rsvp', {
  user : String,
  name : String,
  email : String,
  attending : String,
  friday: String,
  saturday: String,
  number : Number,
  guest : String,
  notes : String
});

// routes ==

router.use(function (req,res,next) {
  next();
});

//
// router.get("/",function(req,res){
//   res.sendfile('./public/index.html');
// });
//
// router.get("/details",function(req,res){
//   res.sendfile('./public/details.html');
// });
//
// router.get("/wedding-party",function(req,res){
//   res.sendfile('./public/wedding-party.html');
// });
//
// router.get("/rsvp",function(req,res){
//   res.sendfile('./public/rsvp.html');
// });
//
router.get("/sharif-rsvp-list",function(req,res){
  res.sendfile('./public/rsvps.html');
});

  app.get('/api/rsvps', function(req, res) {

        // use mongoose to get all rsvps in the database
    Rsvp.find(function(err, rsvps) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err);

      res.json(rsvps); // return all todos in JSON format
    });
  });

    // create rsvp and send back all todos after creation
    app.post('/api/rsvps', function(req, res) {
        // create a rsvp, information comes from AJAX request from Angular
        Rsvp.create({
            user : 'user',
            name : req.body.name,
            email : req.body.email,
            attending : req.body.attending,
            friday : req.body.friday,
            saturday : req.body.saturday,
            number : req.body.number || 0,
            guest : req.body.guest,
            notes : req.body.notes,
            done : false
        }, function(err, rsvp) {
            if (err)
              // console.log("HELP");
                res.send(err);

            // get and return all the rsvps after you create another
            Rsvp.find(function(err, rsvps) {
              if (err)
                res.send(err)
              res.json(rsvps);
            });
        });

    });

    // delete a rsvp
    app.delete('/api/rsvps/:todo_id', function(req, res) {
        Rsvp.remove({
            _id : req.params.todo_id
        }, function(err, rsvp) {
            if (err)
                res.send(err);

            // get and return all the rsvps after you create another
            Rsvp.find(function(err, rsvps) {
                if (err)
                  res.send(err)
                res.json(rsvps);
            });
        });
    });

// application -------------------------------------------------------------

app.use("/", router);

app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ====
app.listen(process.env.PORT || 5000);
