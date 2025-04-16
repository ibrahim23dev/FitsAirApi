import { v4 as uuidv4 } from "uuid";

interface KIUResponse {
  KIU_AirAvailRS: any;
}

const parseDurationToMinutes = (duration: string): number => {
  const parts = duration.split(":");
  const [hours, minutes] = parts.map((p) => parseInt(p, 10));
  return hours * 60 + minutes;
};

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
          schedules: [],
          departure: {
            airport_code: segment.DepartureAirport?.$?.LocationCode,
            dateTime: new Date(departureDate).toISOString(),
          },
          arrival: {
            airport_code: segment.ArrivalAirport?.$?.LocationCode,
            dateTime: new Date(arrivalDate).toISOString(),
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
