"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
// Use body-parser to parse XML (if needed)
app.use(body_parser_1.default.text({ type: "application/xml" }));
app.post("/search-flight", async (req, res) => {
    const url = "https://ota-ssl.kiusys.com/ws3/index.php";
    const headers = {
        "Content-Type": "application/xml",
        user_agency: "NARIATRAVELS",
        test_user_psw: "9-ay4Tq@JpVvA8gL",
    };
    const xmlBody = `<?xml version="1.0"?>
<KIU_AirShoppingRQ xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning"
  xmlns:ns="http://www.opentravel.org/OTA/2003/05/common"
  xmlns="http://www.opentravel.org/OTA/2003/05"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05"
  EchoToken="SHOPPEXAMPLEDOCS"
  TimeStamp="2021-12-14T02:23:13+00:00"
  Target="Testing"
  Version="3.0"
  SequenceNmbr="1"
  PrimaryLangID="en-us">

  <POS>
    <Source AgentSine="DACBN4003" TerminalID="DACBN40003" ISOCountry="BD"/>
  </POS>
  <Parameters>
    <CurrCode>EUR</CurrCode>
    <AirPreferences>
      <SpecificCarrier Code="8D"/>
    </AirPreferences>
  </Parameters>
  <JourneyInformation>
    <AirItinerary>
      <OriginDestinationInfo OriginDestRPH="1">
        <OriginLocation>DAC</OriginLocation>
        <DestinationLocation>CMB</DestinationLocation>
        <DepartureDate>2025-04-21</DepartureDate>
      </OriginDestinationInfo>
    </AirItinerary>
    <TravelerInfo>
      <PassengerTypeQuantity Code="ADT" Quantity="1"/>
    </TravelerInfo>
  </JourneyInformation>
</KIU_AirShoppingRQ>`;
    try {
        const response = await axios_1.default.post(url, xmlBody, { headers });
        res.set("Content-Type", "application/xml");
        res.send(response.data);
    }
    catch (error) {
        console.error("Error fetching flight data:", error.message);
        res.status(500).send("Failed to fetch flight data");
    }
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
