import { Country } from 'domains/chains/actions/fetchChainTimeframeData';

export interface RequestsMapProps {
  countries: Country;
}

export interface RequestsCountry {
  name: string;
  isoA2: string;
  coordinates: [number, number];
  requests: string;
  color: string;
}
