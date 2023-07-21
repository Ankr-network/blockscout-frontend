import { PrivatStatTopCountry } from 'multirpc-sdk';

import { CountryMap } from 'domains/chains/actions/public/fetchChainTimeframeData';

export const makePrivateCountryMap = (
  countries: PrivatStatTopCountry[] = [],
): CountryMap =>
  countries.reduce((countryMap, { country, count }) => {
    countryMap[country] = { country, requests: count };

    return countryMap;
  }, {} as CountryMap);
