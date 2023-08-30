export interface IAusCapital {
  Sydney: number;
  Melbourne: number;
  Brisbane: number;
  Canberra: number;
  Darwin: number;
  Hobart: number;
  Perth: number;
  Adelaide: number;
}

export interface ICoordinates {
  lat: number;
  lon: number;
}

export const AUS_CAPITAL_CITIES: IAusCapital = {
  Sydney: 2147714,
  Melbourne: 2158177,
  Brisbane: 2174003,
  Canberra: 2172517,
  Darwin: 2073124,
  Hobart: 2163355,
  Perth: 2063523,
  Adelaide: 2078025,
};

export const ENDPOINT = `current`;

export const COORDINATES: ICoordinates = {
  lat: -33.865143,
  lon: 151.2099,
};
