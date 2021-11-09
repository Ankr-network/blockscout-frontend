import { Country } from 'domains/chains/actions/fetchChainDetails';

export interface RequestsMapProps {
  countries: Country;
}

export interface RequestsCountry {
  name: string;
  coordinates: [number, number];
  requests: string;
  color: string;
}
