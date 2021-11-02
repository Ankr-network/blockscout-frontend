import IsoToLatLong from 'country-iso-to-coordinates';
import BigNumber from 'bignumber.js';

import { RequestsCountry, RequestsMapProps } from './RequestsMapTypes';

export const GEO_URL =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const COLORS = [
  '#006DFF',
  '#FF0000',
  '#37AF25',
  '#FF8A00',
  '#00D1FF',
  '#FF007A',
  '#FFD600',
  '#BD00FF',
  '#AEEB00',
  '#A28575',
];

export const getMarkerPointsAndStats = (
  countries: RequestsMapProps['countries'],
): RequestsCountry[] => {
  const countriesArray = Object.values(countries)
    .sort((a, b) => b.requests - a.requests)
    .slice(0, 10)
    .map((item, index) => {
      const data = IsoToLatLong[item.country];

      if (!data) return null;

      const { coordinate, name } = data;

      const [lat, lon] = coordinate.map(Number);

      return {
        name,
        coordinates: [lon, lat],
        requests: new BigNumber(item.requests).toFormat(),
        color: COLORS[index],
      } as RequestsCountry;
    })
    .filter(Boolean);

  return countriesArray as RequestsCountry[];
};

export const GEOGRAPHY_STYLES = {
  default: { fill: '#E8EEF5' },
  hover: { fill: '#E8EEF5' },
  pressed: { fill: '#E8EEF5', outline: 'none' },
};
