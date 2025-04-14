import { FlightSearchRequest } from "../interfaces/flight.interface";

const cabinMap: { [key: string]: string } = {
  Y: "Economy",
  S: "PremiumEconomy",
  C: "Business",
  J: "PremiumBusiness",
  F: "First",
  P: "PremiumFirst",
};

export const buildFlightSearchXML = (data: FlightSearchRequest): string => {
  const departure = data.OriginDestinationInformation[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<KIU_AirAvailRQ EchoToken="1" TimeStamp="${new Date().toISOString()}" Target="Testing" Version="3.0" SequenceNmbr="1" PrimaryLangID="en-us" DirectFlightsOnly="false" MaxResponses="10" CombinedItineraries="false">
  <POS>
    <Source AgentSine="DACBN4003" TerminalID="DACBN40003" ISOCountry="BD" />
  </POS>
  <SpecificFlightInfo>
    <Airline Code="8D" />
  </SpecificFlightInfo>
  <OriginDestinationInformation>
    <DepartureDateTime>${
      departure.DepartureDateTime.split("T")[0]
    }</DepartureDateTime>
    <OriginLocation LocationCode="${departure.OriginLocation.LocationCode}" />
    <DestinationLocation LocationCode="${
      departure.DestinationLocation.LocationCode
    }" />
  </OriginDestinationInformation>
  <TravelPreferences MaxStopsQuantity="4">
    ${data.TravelPreferences.CabinPref.map(
      (c) =>
        `<CabinPref Cabin="${cabinMap[c.Cabin] || "Economy"}" PreferLevel="${
          c.PreferLevel
        }" />`
    ).join("")}
  </TravelPreferences>
  <TravelerInfoSummary>
    <AirTravelerAvail>
      ${data.PassengerTypeQuantity.map(
        (p) =>
          `<PassengerTypeQuantity Code="${p.Code}" Quantity="${p.Quantity}" />`
      ).join("")}
    </AirTravelerAvail>
  </TravelerInfoSummary>
</KIU_AirAvailRQ>`;
};
