// server.js
const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')
const { PORT = 8000 } = process.env

//  setting request body parser

app.use(express.urlencoded({ extended: false }))
// Kedua, setting session handler
app.use(session({
secret: 'NasiGorengKambing',
resave: false,
saveUninitialized: false
}))

// Ketiga, setting passport
// (sebelum router dan view engine)
const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())

//Psassport JWT
const passportJwt = require('./lib/passport-jwt')
app.use(passportJwt.initialize())


//  setting flash
app.use(flash())
//  setting view engine
app.set('view engine', 'ejs')
//  setting router
const router = require('./router')
app.use(router)
app.listen(PORT, () => {
console.log(`Server nyala di port ${PORT}`)
})