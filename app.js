const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const rIndex = require("./routers/index")
const rAdd = require("./routers/add")
const rUser = require("./routers/user")
const port = process.env.PORT || '5000'
const expressValidator = require("express-validator")
const session = require("express-session")




// mongoose settings
mongoose.connect("mongodb://localhost:27017/computers")
const db = mongoose.connection
db.on("open", ()=>{
    console.log("mongodb running");
})
db.on("error", (err)=>{
    console.log(err);
})


// bodyParser settings
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// pug settings
app.set("view engine" , "pug")


// validator and session settings
// session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// connect flash
app.use(require("connect-flash")())

// messages
app.use(function(req, res, next) {
    res.locals.messages = require("express-messages")
    next()
})

// express-validator
app.use(expressValidator({
    errorFormatter: (param, msg, value)=>{
        let namespace = param.split('.')
        root = namespace.shift()
        formParam = root

        while (namespace.length) {
            formParam+='[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));



// /////////////////
app.use(express.static(path.join(__dirname , "public")))
app.use(express.static(path.join(__dirname, "uploads")))
app.use(express.static(path.join(__dirname)))



// directory settings
app.use(rIndex)
app.use(rAdd)
app.use(rUser)


app.listen(port , ()=>{
    console.log("server running");
})