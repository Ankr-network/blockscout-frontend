import { PrivatStatTopCountry } from 'multirpc-sdk';

export const sortTopCountries = (topCountries: PrivatStatTopCountry[] = []) =>
  [...topCountries].sort((a, b) => b.count - a.count);
