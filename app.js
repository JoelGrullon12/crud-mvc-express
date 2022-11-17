const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");

const path = require("path");

const router = require("./router/router");
const errorCtrl = require("./controllers/errorController");

const indexHlp=require("./helpers/index");
const editHlp=require("./helpers/edit");

app.use(express.static(path.join(__dirname, "public"))); //public folder

app.engine("hbs", hbs.engine({ layoutDir: "views/layouts/", defaultLayout: 'layout', extname: "hbs", helpers:{
    setType:indexHlp.setType,
    movieActive:indexHlp.movieActive,
    setSelect:editHlp.setSelect,
} }));                 //set render engine
app.set("view engine", "hbs");                          //set extensions
app.set("views", "views");                              //set views folder

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use routers
app.use(router);

app.use("/", errorCtrl.Get404);

app.listen(8888);