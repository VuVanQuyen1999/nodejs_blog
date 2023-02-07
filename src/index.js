const { engine } = require("express-handlebars");
const express = require("express");
const morgan = require("morgan");
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

// http logger
app.use(morgan("combined"));

// Template engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
