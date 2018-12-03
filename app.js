/eslint no-unused-vars: "off" /;
var createError = require("http-errors");
var express = require("express");
var passport = require('passport');
var session = require('express-session');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors =require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const goods = require("./routes/goods");
const senders = require("./routes/senders");
const receivers = require("./routes/receivers");
const details = require("./routes/details");
const fuzzySearch = require("./routes/fuzzySearch");
var auth = require('./routes/auth');
const shipmentDetails = require("./routes/shipmentDetails");
var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));

//app.set("view engine", "ejs");
app.set("view engine", "pug");

//app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/auth', auth);

app.get('/goods/findTotalVotes', goods.findTotalVotes);
app.get("/goods",goods.findAllGoods);
app.get("/goods/:id",goods.findOneGood);
app.post("/goods",goods.addGood);
app.delete("/goods/:id",goods.deleteGood);
app.put("/goods/:id/changeLocation/:location", goods.changeGoodLocation);
app.put("/goods/:id/voteForDeliveryman",goods.incrementUpvotes);
//app.put("/goods/:id/changeDeliveryman/:name/:phoneNumber",goods.changeDeliveryman);


app.get("/senders",senders.findAllSenders);
app.get("/senders/:id",senders.findOneSender);
app.get("/senders/findCount/:senderName",senders.findCount);
app.post("/senders",senders.addSender);
app.delete("/senders/:id",senders.deleteSender);


app.get("/receivers",receivers.findAllReceivers);
app.get("/receivers/:id",receivers.findOneReceiver);
app.post("/receivers",receivers.addReceiver);
app.delete("/receivers/:id",receivers.deleteReceiver);
app.put("/receivers/:id/changePhoneNumber/:phoneNumber",receivers.changeReceiverPhoneNumber);
app.put("/receivers/:id/changeAddress/:address",receivers.changeReceiverAddress);

app.get("/details",details.findDetails);
app.get("/details/:id",details.findDetailsByID);

app.get("/fuzzySearch/:keyword",fuzzySearch.FuzzySearchGoodOrSenderOrReceiverName);

app.get("/shipmentDetails",shipmentDetails.findAllDetails);
app.get("/shipmentDetails/:id",shipmentDetails.findOneDetails);
app.get("/goodAndShipment/:id",shipmentDetails.findGoodAndShipment);
app.post("/shipmentDetails",shipmentDetails.addDetails);
app.delete("/shipmentDetails/:id",shipmentDetails.deleteDetails);


// catch 404 and forward to error handler

app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
