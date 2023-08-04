import { Query } from "mongoose";
import Thought from "../models/thoughtModel.js";
import { query } from "express";

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
            username : req.user.username.split(" ")[0],
            thoughts : thoughts
        })
    },
    
    renderAddThought : async(req, res) => {
        res.render("addThought")
    },

    addThought : async(req, res) => {
        const {title, content} = req.body;
        if (title && content){
            const thought  = new Thought({
                title : title,
                content : content,
                owner : req.user.id
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
                thought : thought
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
        const {title, content} = req.body;
        const {id} = req.params;
        const thought = await Thought.findOne({_id : id, owner : req.user.id});
        if (thought){
            await Thought.findByIdAndUpdate(id, {
                title : title,
                content : content
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
            res.render("thought", {thought});
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