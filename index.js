const express = require('express')
const jwt = require('jsonwebtoken')
const mongo = require('./config/mongoose')
const passport = require('./config/passport-localStrategy')
const PORT = 8000
const app = express()






app.use(express.json())

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const JWTMiddleware = (req, res, next) => {

    console.log("headers", req.headers.authorization)
    if (req.headers.authorization) {

        const token = req.headers.authorization.split(' ')[1]
        const data = jwt.verify(token, 'JWT_KEY')
        if (data.user === 'doctor') {
            req.user = data
            next()
        } else {
            return res.status(401).json({ message: "Token is invalid!" })
        }

    } else {
        return res.status(401).json({ message: "Token is missing!" })

    }


}

app.use('/', require('./routes'))


mongo.then(() => {
    app.listen(PORT, () => {
        console.log("Server started successfully!")
    })
}).catch((error) => { console.log("Database connection error!", error) })