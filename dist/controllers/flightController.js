"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availFlight = void 0;
const flightService_1 = require("../services/flightService");
const flightTransformService_1 = require("../services/flightTransformService");
const availFlight = async (req, res) => {
    try {
        const parsedResponse = await (0, flightService_1.fetchAvailableFlights)(req.body);
        const transformed = (0, flightTransformService_1.transformKiuResponse)(parsedResponse);
        res.json(transformed);
    }
    catch (error) {
        console.error("Flight search error:", error.message);
        res.status(500).json({ error: "Flight search failed" });
    }
};
exports.availFlight = availFlight;
