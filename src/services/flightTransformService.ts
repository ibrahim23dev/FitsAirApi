import { v4 as uuidv4 } from "uuid";

interface KIUResponse {
  KIU_AirAvailRS: any;
}

export const transformKiuResponse = (response: KIUResponse) => {
  const options =
    response?.KIU_AirAvailRS?.OriginDestinationInformation
      ?.OriginDestinationOptions?.OriginDestinationOption;

  if (!options) return [];

  const flightOptions = Array.isArray(options) ? options : [options];

  return flightOptions.map((option: any, index: number) => {
    const segment = option.FlightSegment;

    const flightId = uuidv4();

    const departureDate = segment.$.DepartureDateTime;
    const arrivalDate = segment.$.ArrivalDateTime;
    const flightNumber = segment.$.FlightNumber;
    const duration = segment.$.JourneyDuration;

    return {
      id: index + 1,
      flight_id: flightId,
      pricingSource: "KIU",
      totalDuration: parseDurationToMinutes(duration),
      isRefundable: true,
      deal: "",
      isDomestic: false,
      isMultiFlight: false,
      points: {
        earn: 0,
      },
      legs: [
        {
          id: index + 1,
          duration: parseDurationToMinutes(duration),
          airlines: {
            code: segment.MarketingAirline?.$?.CompanyShortName || "",
            name: "",
            logo: `${segment.MarketingAirline?.$?.CompanyShortName}.png`,
            flight_number: parseInt(flightNumber, 10),
          },
          schedules: [
            {
              id: index + 100,
              e_ticketable: true,
              stopCount: parseInt(segment.$.StopQuantity, 10),
              duration: parseDurationToMinutes(duration),
              distance_miles: 0, 
              frequency: "SMTWTFS",
              airlines: {
                code: segment.MarketingAirline?.$?.CompanyShortName,
                name: "",
                logo: `${segment.MarketingAirline?.$?.CompanyShortName}.png`,
                flight_number: parseInt(flightNumber, 10),
              },
              departure: {
                airport_name: "",
                airport_city: "",
                airport_code: segment.DepartureAirport?.$?.LocationCode,
                city_code: segment.DepartureAirport?.$?.LocationCode,
                country_code: "",
                country_name: "",
                date: departureDate.split(" ")[0],
                dateTime: new Date(departureDate).toISOString(),
                time: departureDate.split(" ")[1],
                timezone: "+06:00",
              },
              arrival: {
                airport_name: "",
                airport_city: "",
                airport_code: segment.ArrivalAirport?.$?.LocationCode,
                country_code: "",
                country_name: "",
                date: arrivalDate.split(" ")[0],
                dateTime: new Date(arrivalDate).toISOString(),
                time: arrivalDate.split(" ")[1],
                timezone: "+06:00",
              },
              carrier: {
                marketing: segment.MarketingAirline?.$?.CompanyShortName,
                marketingFlightNumber: parseInt(flightNumber, 10),
                operating: segment.MarketingAirline?.$?.CompanyShortName,
                operatingFlightNumber: parseInt(flightNumber, 10),
              },
              baggage: {
                id: 1,
                pieceCount: 2,
                provisionType: "A",
                airlineCode: segment.MarketingAirline?.$?.CompanyShortName,
              },
              infantBaggage: {
                id: 1,
                pieceCount: 1,
                provisionType: "A",
                airlineCode: segment.MarketingAirline?.$?.CompanyShortName,
              },
              layoverDuration: 0,
            },
          ],
          departure: {
            airport_name: "",
            airport_city: "",
            airport_code: segment.DepartureAirport?.$?.LocationCode,
            city_code: segment.DepartureAirport?.$?.LocationCode,
            country_code: "",
            country_name: "",
            date: departureDate.split(" ")[0],
            dateTime: new Date(departureDate).toISOString(),
            time: departureDate.split(" ")[1],
            timezone: "+06:00",
          },
          arrival: {
            airport_name: "",
            airport_city: "",
            airport_code: segment.ArrivalAirport?.$?.LocationCode,
            country_code: "",
            country_name: "",
            date: arrivalDate.split(" ")[0],
            dateTime: new Date(arrivalDate).toISOString(),
            time: arrivalDate.split(" ")[1],
            timezone: "+06:00",
          },
          departureLocation: segment.DepartureAirport?.$?.LocationCode,
          arrivalLocation: segment.ArrivalAirport?.$?.LocationCode,
          totalLayoverDuration: 0,
          layoverAirports: [],
          stop: parseInt(segment.$.StopQuantity, 10),
        },
      ],
      pricingSubsource: "KIU_XML",
      distributionModel: "DIRECT",
      validatingCarrierCode: segment.MarketingAirline?.$?.CompanyShortName,
      vita: true,
      eTicketable: true,
      lastTicketDate: departureDate.split(" ")[0],
      lastTicketTime: departureDate.split(" ")[1],
      governingCarriers: segment.MarketingAirline?.$?.CompanyShortName,
      totalFare: {
        discount: 0,
        baseFare: 0,
        totalTaxAmount: 0,
        totalPrice: 0,
        discountAmount: 0,
        payable: 0,
        currency: "BDT",
      },
      promotionalCoupon: null,
      passengerInfoList: [],
    };
  });
};

const parseDurationToMinutes = (duration: string): number => {
  const parts = duration.split(":");
  const [hours, minutes] = parts.map((p) => parseInt(p, 10));
  return hours * 60 + minutes;
};
