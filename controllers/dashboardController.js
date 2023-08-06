import Thought from "../models/thoughtModel.js";

const dashboardController = {
    renderDashboard : async(req, res) => {
        const {search} = req.query;
        let queryObject = {};
        queryObject.owner = req.user.id
        if (search){
            queryObject.title = {$regex : search.trim(), $options : "i"}
        }    
        const thoughts = await Thought.find(queryObject);
        res.render("dashboard", {
            name : req.user.name.split(" ")[0],
            thoughts : thoughts
        })
    },
    
    renderAddThought : async(req, res) => {
        res.render("addThought")
    },

    addThought : async(req, res) => {
        const {title, content, scope} = req.body;
        if (title && content){
            const thought  = new Thought({
                title : title,
                content : content,
                scope : scope,
                owner : req.user.id,
                ownerUsername : req.user.email.split("@")[0]
            })
            await thought.save();
            res.redirect("/dashboard")
        }else{
            res.render("msg", {
                title : "Required",
                msg : "All fields are required",
                linkTitle : "Go Back",
                link : "/dashboard/thought/add"
            })
        }
    },

    renderUpdateThought : async(req, res) => {
        const {id} = req.params;
        const thought = await Thought.findOne({_id : id, owner : req.user.id});
        if (thought){
            res.render("updateThought", {
                thought : thought,
                publicScope : thought.scope === "public"
            })
        }else{
            res.render("msg", {
                title : "Error",
                msg : "Something went wrong",
                link : "/dashboard",
                linkTitle : "Dashboard"
            })
        }
    },

    updateThought : async(req, res) => {
        const {title, content, scope} = req.body;
        const {id} = req.params;
        const thought = await Thought.findOne({_id : id, owner : req.user.id});
        if (thought){
            await Thought.findByIdAndUpdate(id, {
                title : title,
                content : content,
                scope : scope
            });
            res.redirect("/dashboard")
        }else{
            res.render("msg", {
                title : "Error",
                msg : "Something went wrong",
                link : "/dashboard",
                linkTitle : "Dashboard"
            })
        }
    },

    renderThought : async(req, res) => {
        const {id} = req.params;
        const thought = await Thought.findOne({_id : id, owner : req.user.id});
        if (thought){
            res.render("thought", {thought, picture : req.user.picture});
        }else{
            res.render("msg", {
                title : "Error",
                msg : "Something went wrong",
                link : "/dashboard",
                linkTitle : "Dashboard"
            })
        }
    },

    deleteThought : async(req, res) => {
        const {id} = req.params;
        const thought = await Thought.findOne({_id : id, owner : req.user.id});
        if (thought){
            await Thought.findByIdAndDelete(thought._id);
            res.redirect("/dashboard")
        }else{
            res.render("msg", {
                title : "Error",
                msg : "Something went wrong",
                link : "/dashboard",
                linkTitle : "Dashboard"
            })
        }
        
    },

    logout : async(req, res) => {
        req.session.destroy();
        res.clearCookie("connect.sid")
        res.redirect("/");
    }
}

export default dashboardController;