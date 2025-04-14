import axios from "axios";
import qs from "qs";
import xml2js from "xml2js";
import { config } from "../config";
import { FlightSearchRequest } from "../interfaces/flight.interface";
import { buildFlightSearchXML } from "../utils/xmlBuilder";

export const fetchAvailableFlights = async (data: FlightSearchRequest) => {
  const xml = buildFlightSearchXML(data);
  const formData = qs.stringify({
    user: config.kiuUser,
    password: config.kiuPassword,
    request: xml,
  });

  const response = await axios.post(config.kiuApiUrl, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const parser = new xml2js.Parser({
    explicitArray: false,
    ignoreAttrs: false,
  });

  return parser.parseStringPromise(response.data);
};
