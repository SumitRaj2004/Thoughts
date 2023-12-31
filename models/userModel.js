import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    googleId : {
        type : String,
        required : true
    },
    picture : {
        type : String,
        required : true
    }
})

const User = mongoose.model("User", userSchema);

export default User;