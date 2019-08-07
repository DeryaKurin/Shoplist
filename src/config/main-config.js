require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const passportConfig = require("./passport-config");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = = require('cookie-parser');
const session = require("express-session");
const flash = require("express-flash");



module.exports = {
  init(app, express){
     app.set("views", viewsFolder);
     app.set("view engine", "ejs");
     app.use(express.static(path.join(__dirname, "..", "assets")));     app.use(bodyParser.urlencoded({ extended: true }));
     app.use(bodyParser.urlencoded({ extended: true }));
     app.use(expressValidator());
     app.use(express.cookieParser('It is rainy today'));
     app.use(session({
       secret: process.env.cookieSecret,
       resave: false,
       saveUninitialized: false,
       cookie: { maxAge: 1.21e+9 }
     }));
     app.use(flash());
     passportConfig.init(app);
     app.use((req,res,next) => {
          res.locals.currentUser = req.user;
          next();
     });
  }
};
