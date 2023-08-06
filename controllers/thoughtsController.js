import Thought from "../models/thoughtModel.js";
import User from "../models/userModel.js";

const thoughtsController = {
    renderThoughts : async(req, res) => {
        const {search} = req.query;
        let queryObject = {};
        queryObject.scope = "public"
        if (search){
            queryObject.title = {$regex : search.trim(), $options : "i"}
        }    
        const thoughts = await Thought.find(queryObject).sort({updatedAt : -1})
        res.render("thoughts", {
            thoughts : thoughts
        })
    },

    renderThought : async(req, res) => {
        const {id} = req.params;
        try{
            const thought = await Thought.findOne({_id : id});
            const user = await User.findOne({_id : thought.owner});
            res.render("publicThought", {
                thought,
                picture : user.picture
            })
        }catch(err){
            res.render("msg", {
                title : "Error",
                msg : "Page not found",
                link : "/thoughts",
                linkTitle : "Go to thoughts"
            })
        }

    }
}

export default thoughtsController;