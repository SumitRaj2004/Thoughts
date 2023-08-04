import {config} from "dotenv"
config();
import User from "../models/userModel.js"
import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser( async(id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user)
        // this done will attach the  "user"to request object
    }catch(err){
        done(err, false)
    }
})

passport.use(new GoogleStrategy({
    clientID : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
    callbackURL : "/auth/google/redirect"
}, async(accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({googleId : profile.id});
    if (user){
        return cb(null, user)
    }else{
        const user = new User({
            username : profile.displayName,
            email : profile.emails[0].value,
            googleId : profile.id,
            picture : profile.photos[0].value
        })
        await user.save()
        return cb(null, user)
    }
}))