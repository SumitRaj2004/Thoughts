import express from "express";
import dashboardController from "../controllers/dashboardController.js";
import auth from "../middlewares/authMiddleware.js";
import Thought from "../models/thoughtModel.js";

const router = new express.Router();

router.get("/", auth, dashboardController.renderDashboard);
router.get("/thought/add", auth, dashboardController.renderAddThought)
router.post("/thought/add", auth, dashboardController.addThought)
router.get("/thought/update/:id", auth, dashboardController.renderUpdateThought)
router.patch("/thought/update/:id", auth, dashboardController.updateThought)
router.get("/thought/:id", auth, dashboardController.renderThought)
router.delete("/thought/:id", auth, dashboardController.deleteThought)
router.get("/logout", auth, dashboardController.logout);


export default router;