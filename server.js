//REQUIRE MODULES & CONNECTIONS ↓
const path = require("path"); //file paths
const express = require("express"); //creating and configuring web server
const session = require("express-session"); //session management
const exphbs = require("express-handlebars"); //rendering dynamic HTML templates

const routes = require("./controllers"); //custom controllers
const helpers = require('./utils/helpers'); //custom helpers

const sequelize = require("./config/connection"); //database access (created in connection.js file).
const SequelizeStore = require("connect-session-sequelize")(session.Store); //Sequelize-based session store (manages user sessions in the application.)

//INITIATE THEM? ↓
const app = express(); //create express js object
const PORT = process.env.PORT || 3001; //sets the port number

const hbs = exphbs.create({ helpers }); // Set up Handlebars.js engine with custom helpers

const sess = {
  //creates a session object with config options
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize, //sets up to use mysql database
  }),
};

//USE/SET ↓
app.use(session(sess)); //session 'sess' added to middleware

// Inform Express.js on which template engine to use (sets up handlebars.js view engine as default engine for rendering HTML views)

app.engine("handlebars", hbs.engine); //associates .handlebars file with the the handlebars.js view engine.... hbs.engine function from exphbs.create() method. Returns a configured handlebars.js instance with customhelper functions

//sets default view engine to handlebars.so when you render views in your routes,you dont need to include the file extension
app.set("view engine", "handlebars");

//middleware to parse incoming request bodies
app.use(express.json()); //handles JSON-encoded data
app.use(express.urlencoded({ extended: true })); //handles form-encoded data
app.use(express.static(path.join(__dirname, "public"))); //serves static files, such as images and stylesheets, from the public directory.

app.use(routes); //mounts routes (imported above) to the application.

//START ↓
//synchronizes the Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  //force:false = database tables will not be dropped and re-created if they already exist.
  app.listen(PORT, () => console.log("Now listening")); //starts listening on specified port.
});
