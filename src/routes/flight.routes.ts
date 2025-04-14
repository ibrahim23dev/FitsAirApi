import express from "express";
import { availFlight } from "../controllers/flightController";

const router = express.Router();

router.post("/avail-flight", availFlight);

export default router;
