import { Country } from 'domains/chains/actions/fetchChainDetails';

export interface RequestsMapProps {
  countries: Country;
  userCountryCode: string;
}

export interface RequestsCountry {
  name: string;
  isoA2: string;
  coordinates: [number, number];
  requests: string;
  color: string;
}
