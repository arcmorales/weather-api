import { IAusCapital } from "commons/constants";

export const getAusCapitalCityIds = (capitals: IAusCapital) => {
  return Object.values(capitals);
};

export const sortCityTemp = (cityArray: [], prop: string) => {
  return cityArray.sort((city1, city2) => {
    return city2[prop] - city1[prop];
  });
};
