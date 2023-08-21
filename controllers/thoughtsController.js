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
        const thoughts = await Thought.find(queryObject).populate("owner").sort({updatedAt : -1});
        res.render("thoughts", {thoughts})
    },

    renderThought : async(req, res) => {
        const {id} = req.params;
        try{
            const thought = await Thought.findOne({_id : id}).populate("owner");
            res.render("publicThought", {thought : thought})
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