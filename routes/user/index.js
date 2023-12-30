const express = require('express')
const User = require('../../model/user')
const passport = require('../../config/passport-localStrategy')
const router = express.Router()

router.get('/data', (req, res) => {

    console.log("The req:", req)
    return res.status(200).json({
        data: "user"
    })

})

router.post('/signup', async (req, res) => {

    const user = await User.create(req.body)
    return res.status(200).json({
        data: user
    })

})

router.post('/signin', passport.authenticate('local', { failureRedirect: '/data', session: false }) ,async (req, res) => {

    return res.status(200).json({data: req.user})

})

router

module.exports = router