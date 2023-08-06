import express from "express";
import thoughtsController from "../controllers/thoughtsController.js";
const router = new express.Router();

router.get("/", thoughtsController.renderThoughts);
router.get("/:id", thoughtsController.renderThought);


export default router;