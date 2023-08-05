import express from "express";
import mainController from "../controllers/mainController.js";

const router = new express.Router();

router.get("/", mainController.renderHome);
router.get("/about", mainController.renderAbout)


export default router;