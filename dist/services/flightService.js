"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAvailableFlights = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const xml2js_1 = __importDefault(require("xml2js"));
const config_1 = require("../config");
const xmlBuilder_1 = require("../utils/xmlBuilder");
const fetchAvailableFlights = async (data) => {
    const xml = (0, xmlBuilder_1.buildFlightSearchXML)(data);
    const formData = qs_1.default.stringify({
        user: config_1.config.kiuUser,
        password: config_1.config.kiuPassword,
        request: xml,
    });
    const response = await axios_1.default.post(config_1.config.kiuApiUrl, formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    const parser = new xml2js_1.default.Parser({
        explicitArray: false,
        ignoreAttrs: false,
    });
    return parser.parseStringPromise(response.data);
};
exports.fetchAvailableFlights = fetchAvailableFlights;
