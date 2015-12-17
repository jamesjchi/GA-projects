// modules
var express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./models'),
  flash = require('connect-flash'),
  // ejsLayouts = require('express-ejs-layouts'),
  session = require('express-session'),
  app = express();
  // stripe = require("stripe")(
  // "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
  // );

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/assets/static'));
app.use(flash());
app.use(session({
  secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
  resave: false,
  saveUninitialized: true
}));
app.use(function(req, res, next) {
  if (req.session.user) {
    db.user.findById(req.session.user).then(function(user) {
      req.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    next();
  }
});
app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});

//controllers
app.use('/', require('./controllers/index'));
app.use('/auth', require('./controllers/auth'));
app.use('/profiles', require('./controllers/profiles'));
app.use('/myAccount', require('./controllers/myAccount'));
app.use('/person', require('./controllers/person'));
app.use('/admin', require('./controllers/admin'));

app.listen(process.env.PORT || 3000);