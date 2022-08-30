import { CountryMap } from 'domains/chains/actions/fetchChainTimeframeData';
import { Timeframe } from 'domains/chains/types';

export interface RequestsMapProps {
  countries?: CountryMap;
  timeframe: Timeframe;
}

export interface RequestsCountry {
  name: string;
  isoA2: string;
  coordinates: [number, number];
  requests: string;
  color: string;
}
