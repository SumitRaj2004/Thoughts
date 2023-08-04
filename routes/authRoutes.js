import express from "express";
import authController from "../controllers/authController.js";
import passport from "passport";
import auth from "../middlewares/authMiddleware.js"

const router = new express.Router();


router.get("/google", passport.authenticate("google", {
    scope : ["profile", "email"]
}))

router.get("/google/redirect", passport.authenticate("google"), authController.redirectDashbaord)



export default router;