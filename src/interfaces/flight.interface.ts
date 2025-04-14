export interface PassengerType {
  Code: string;
  Quantity: number;
}

export interface CabinPreference {
  Cabin: string;
  PreferLevel: string;
}

export interface Location {
  LocationCode: string;
}

export interface OriginDestination {
  DepartureDateTime: string;
  OriginLocation: Location;
  DestinationLocation: Location;
}

export interface FlightSearchRequest {
  OriginDestinationInformation: OriginDestination[];
  PassengerTypeQuantity: PassengerType[];
  TravelPreferences: {
    CabinPref: CabinPreference[];
  };
}
