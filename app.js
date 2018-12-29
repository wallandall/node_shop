const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const config = require('./config/config.js');
const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
  uri: config.MONGODB_URI, 
  collection: 'session'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoute = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: config.SECRET, 
    resave: false, 
    saveUninitialized: false,
    store: store
  }));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use('/admin', adminRoutes);

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoute);

app.use(errorController.get404);





mongoose
  .connect(config.MONGODB_URI, {
      useNewUrlParser: true
  })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });