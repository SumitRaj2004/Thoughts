import mongoose from "mongoose";

const thoughtSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    scope : {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, {timestamps : true})

const Thought = mongoose.model("Thought", thoughtSchema);

export default Thought;