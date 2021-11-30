import IsoToLatLong from 'country-iso-to-coordinates';
import BigNumber from 'bignumber.js';
import { lighten } from '@material-ui/core';
import map from './map.json';

import { RequestsCountry, RequestsMapProps } from './RequestsMapTypes';

export const GEO_URL = map;

const COLOR_DEFAULT = '#E8EEF5';

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
        isoA2: item.country,
        coordinates: [lon, lat],
        requests: new BigNumber(item.requests).toFormat(),
        color: COLORS[index],
      } as RequestsCountry;
    })
    .filter(Boolean);

  return countriesArray as RequestsCountry[];
};

export const GEOGRAPHY_STYLES = {
  default: { fill: COLOR_DEFAULT },
  hover: { fill: COLOR_DEFAULT },
  pressed: { fill: COLOR_DEFAULT, outline: 'none' },
};

const strokeStyles = { strokeWidth: 0.5, stroke: '#fff' };

export const getGeogrpahyStyles = (geo: any, data: RequestsCountry[]) => {
  const fillColor =
    data.find(item => item.isoA2 === geo?.properties?.ISO_A2)?.color ||
    COLOR_DEFAULT;

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
