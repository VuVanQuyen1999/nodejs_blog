const { engine } = require("express-handlebars");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const sortMiddleware = require("./app/middleware/SortMiddleware");
const helpers = require("./resources/helpers/handlebars");
const path = require("path");
const app = express();
const port = 3000;

const route = require("./Routes");
const db = require("./config/db");

// Connect to DB
db.connect();

//
app.use(express.static(path.join(__dirname, "public")));

//
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(methodOverride("_method"));

//custom middleware
app.use(sortMiddleware);

// http logger
app.use(morgan("combined"));

// Template engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        helpers: helpers,
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
