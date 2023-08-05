import {config} from "dotenv"
config();
import User from "../models/userModel.js"
import Thought from "../models/thoughtModel.js";
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

        // when a user signed up with google for the first time we will create a defualt thought 
        const thought = new Thought({
            title : "Introduction",
            content : "Thought, the cornerstone of human consciousness, is a fascinating and profound phenomenon that shapes our perceptions, emotions, and actions. It is the intangible thread that weaves through the fabric of our minds, giving rise to ideas, memories, and dreams. At its core, thought is the process of cognitive reasoning, imagination, and contemplation. It empowers us to make sense of the world, solve problems, and communicate complex ideas. Thoughts can be fleeting and ephemeral, like a passing breeze, or they can become the foundation for life-changing decisions and innovations. In our thought-storing website, we recognize the value of capturing and preserving these fleeting moments of inspiration and insight. We provide a virtual canvas where you can organize, cherish, and revisit your thoughts, fostering self-awareness and personal growth. So, join us on this intellectual journey, as we celebrate the wonder of thought and its infinite potential to shape our lives and the world around us.",
            owner : user._id
        });
        await thought.save();
        return cb(null, user)
    }
}))