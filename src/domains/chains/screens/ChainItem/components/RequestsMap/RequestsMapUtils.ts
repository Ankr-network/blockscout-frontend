import IsoToLatLong from 'country-iso-to-coordinates';
import { lighten } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';

import { RequestsCountry, RequestsMapProps } from './RequestsMapTypes';

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
        requests: t('chain-item.map.stats-table.value', {
          value: item.requests,
        }),
        color: COLORS[index],
      } as RequestsCountry;
    })
    .filter(Boolean);

  return countriesArray as RequestsCountry[];
};
