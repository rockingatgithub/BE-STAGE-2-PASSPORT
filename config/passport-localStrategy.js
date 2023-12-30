const passport = require('passport');
const User = require('../model/user');
const passportLocalStrategy = require('passport-local').Strategy


passport.use(new passportLocalStrategy( {usernameField: 'email'},
    async function(email, password, done) {
      
        let user = await User.findOne({email: email})
        console.log("the user", user)
        if(user) {
            if (user.password === password) {
                done(null, user)
            } else {
                done(null, false)
            }
        } else {
            done(null, false)
        }
    }
  ));


module.exports = passport