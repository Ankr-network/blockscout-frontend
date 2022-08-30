import { CountryMap } from 'domains/chains/actions/fetchChainTimeframeData';
import { PrivatStatTopCountry } from 'multirpc-sdk';

export const makePrivateCountryMap = (
  countries: PrivatStatTopCountry[] = [],
): CountryMap =>
  countries.reduce((countryMap, { country, count }) => {
    countryMap[country] = { country, requests: count };

    return countryMap;
  }, {} as CountryMap);
