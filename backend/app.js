const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")//Для получения данных форм из запроса необходимо использовать специальный пакет body-parser
const flash = require("express-flash")
const cors = require("cors")
const app = express()


/*
const passport = require("passport")
const initializePassport = require("./services/passport.service")
initializePassport(passport)
*/


//middlewares
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(flash())
const authRouter = require("./routes/auth.routes")
//settings

//for passport
/*let expireDate = new Date()
expireDate.setDate(expireDate.getDate() + 1)

const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: { expires: expireDate, domain: "localhost" },
})

app.use(expressSession)
app.use(passport.initialize())
app.use(passport.session())*/


//routes
app.get("/", (req, res) => res.send("Welcome"))
app.use("/auth", authRouter)
app.get('/kek', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];

    res.json(customers);
});



/*
app.use(flash());
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { domain:'localhost'}
});
app.use(expressSession);

app.use('/api', routes);

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
*/


/*app.use(passport.initialize());
app.use(passport.session());
*/
module.exports = app;
