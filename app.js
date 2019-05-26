const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt=require('jsonwebtoken');
const mongoUtil = require( './Database/mongoUtil' );
let app = express();

const tokenKey = "djghhhhuuwiwuewieuwieuriwu";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoUtil.connectToServer( function(err) {

  if (err) {
    console.log(err)
  } else {

    console.log("its connected");

    const usersService = require('./Services/UsersService');
    const locationRouter = require('./routes/location');
    const messagesRouter = require('./routes/messages');
    const imagesRouter = require('./routes/image');

    //Token resolver
    app.use((req, res, next) => {

      try {

        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, tokenKey, function (err, payload) {

          if (payload) {

            usersService.getUserById(payload.userId, (user) => {
              if (user != null) {
                req.user = user;
              }
              next();
            });

          } else {
            next()
          }
        });

      } catch (e) {
        next()
      }

    });

    //Login
    app.post('/login', function (req, res) {

      usersService.validationUser(req.body.username, req.body.password, (user) => {

        if (user !== null) {

          const token = jwt.sign({userId: user._id}, tokenKey);
          res.status(200).send({
            userId: user._id,
            username: user.username,
            token
          });

        } else {
          res.status(401).json({message: 'Invalid Password/Username'});
        }

      });

    });

    //Check if user is authorized
    app.use((req, res, next) => {

      if (req.user != null) {
        next();
      } else {
        res.status(403).send("unauthorized");
      }

    });

    app.use('/locations', locationRouter);
    app.use('/messages', messagesRouter);
    app.use('/images', imagesRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

  }

} );

module.exports = app;
