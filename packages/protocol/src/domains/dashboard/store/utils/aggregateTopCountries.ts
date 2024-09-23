import { PrivatStatTopCountry } from 'multirpc-sdk';

import { sortTopCountries } from './sortTopCountries';

type CountriesMap = Record<string, PrivatStatTopCountry>;

const joinCountries = (
  { count, country, total_cost }: PrivatStatTopCountry,
  topCountry?: PrivatStatTopCountry,
): PrivatStatTopCountry => ({
  count: (topCountry?.count || 0) + (count || 0),
  country,
  total_cost: (topCountry?.total_cost || 0) + (total_cost || 0),
});

export const aggregateTopCountries = (countries: PrivatStatTopCountry[]) =>
  sortTopCountries(
    Object.values(
      countries.reduce<CountriesMap>((result, topCountry) => {
        const { country } = topCountry;

        result[country] = joinCountries(topCountry, result[country]);

        return result;
      }, {}),
    ),
  );
