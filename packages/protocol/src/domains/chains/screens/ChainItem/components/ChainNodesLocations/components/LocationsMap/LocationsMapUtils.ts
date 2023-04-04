import IsoToLatLong from 'country-iso-to-coordinates';
import { INodesDetailEntity } from 'multirpc-sdk';

import { RequestsCountry } from '../../../RequestsMap/RequestsMapTypes';
import countriesToContinents from './countriesToContinents.json';

const countriesToContinentsValues = Object.entries(countriesToContinents);

const getRequestCountry = (country: string) => {
  const data = IsoToLatLong[country];

  if (!data) return null;

  const { coordinate, name } = data;

  const [lat, lon] = coordinate.map(Number);

  return {
    name,
    isoA2: country,
    coordinates: [lon, lat],
    color: '#356DF3',
  } as RequestsCountry;
};

export const formatNodesDetailToCountries = (
  nodesDetail: INodesDetailEntity[],
): RequestsCountry[] => {
  const continents: Record<string, boolean> = {
    AS: false,
    EU: false,
    AF: false,
    NA: false,
    OC: false,
    SA: false,
  };

  const countriesArray = nodesDetail?.[0]?.nodes
    .map(item => {
      const { continent } = item.location;

      if (continents[continent]) return null;

      const continentCountries = [...countriesToContinentsValues]
        .filter(countryContinent => countryContinent[1] === continent)
        ?.map(countryContinent => getRequestCountry(countryContinent[0]));

      continents[continent] = true;

      return continentCountries;
    })
    ?.flat()
    ?.filter(Boolean);

  return countriesArray as RequestsCountry[];
};
