//#region loading packages
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

//#endregion

// make express app.
var app = express();

// register partials views
hbs.registerPartials(__dirname+"/views/partials");

// configure express with a key-value pair. it tells express
// the view engine to use.
app.set("view engine", "hbs");

//#region usinng middlewares
// __dirname stores the path of the project directory.
app.use(express.static(__dirname+"/public"));

// using middleware
app.use( (req, res, next) => {
    var now = new Date().toString();

    // logs date of request of app. 
    var log = `${now} ${req.method} ${req.url}`;

    // creating a file with the log.
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) console.log(err); 
    });
    console.log(`${now} ${req.method} ${req.url}`);
    next();
});

// preventing the request of other pages by not invoking next()
// but showing maintenance page as a response.
// app.use( (req, res, next) => {
//     res.render("maintenance.hbs");
// });

//#endregion


// helper to reuse so it can be used directly in the page
// this helper get current year.
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

// this helper converts a string to UpperCase.
hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

//#region request/response handlers
// setup get http handler. argument url and response function.
// that function takes the request from user and response from app.
app.get("/", (req, res) => {
    //res.send("<h1>Hello User!</h1>");
    res.send({
        name: "John",
        lastname: "Doe"
    });
});

app.get("/home", (req, res) => {
    res.render("home.hbs", {
        PageTitle: "Home Page",
        WelcomeMessage: "Welcome to my page!"
    })
});

// handler for about route
app.get("/about", (req, res) => {
    // rendering dynamic page.
    // second argument is an object with properties to place in the page.
    res.render("about.hbs", {
        PageTitle: "About Page",
    });
});

// handler for bad route
app.get("/bad", (req, res) => {
    res.send({
        errorType: "404",
        description: "The requested page doesn't exist"
    });
});

//#endregion

// binds app to a port. takes an optional function as a second argument.
app.listen(3000, () => {
    console.log("using port 3000");
});