import { Request, Response } from "express";
import { fetchAvailableFlights } from "../services/flightService";
import { transformKiuResponse } from "../services/flightTransformService";

export const availFlight = async (req: Request, res: Response) => {
  try {
    const parsedResponse = await fetchAvailableFlights(req.body);
    const transformed = transformKiuResponse(parsedResponse);
    res.json(transformed);
  } catch (error: any) {
    console.error("Flight search error:", error.message);
    res.status(500).json({ error: "Flight search failed" });
  }
};
