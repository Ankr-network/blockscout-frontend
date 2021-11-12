import IsoToLatLong from 'country-iso-to-coordinates';
import BigNumber from 'bignumber.js';
import { lighten } from '@material-ui/core';

import { RequestsCountry, RequestsMapProps } from './RequestsMapTypes';

export const GEO_URL =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const COLORS = Array(10)
  .fill(0)
  .map((item, index) => lighten('#356DF3', 0.1 * index));

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

const strokeStyles = { strokeWidth: 0.5, stroke: '#fff' };

export const getGeogrpahyStyles = (geo: any, data: RequestsCountry[]) => {
  /* geo?.properties?.NAME_LONG is used for United States matching */
  const fillColor =
    data.find(
      item =>
        item.name === geo?.properties?.NAME ||
        item.name === geo?.properties?.NAME_LONG,
    )?.color || '#E8EEF5';

  return {
    default: { fill: fillColor, ...strokeStyles },
    hover: { fill: fillColor, ...strokeStyles },
    pressed: {
      fill: fillColor,
      outline: 'none',
      ...strokeStyles,
    },
  };
};
