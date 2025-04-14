import express from "express";
import bodyParser from "body-parser";
import flightRoutes from "./routes/flight.routes";

const app = express();

app.use(bodyParser.json());
app.use("/api", flightRoutes);

export default app;
