"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flightController_1 = require("../controllers/flightController");
const router = express_1.default.Router();
router.post("/avail-flight", flightController_1.availFlight);
exports.default = router;
