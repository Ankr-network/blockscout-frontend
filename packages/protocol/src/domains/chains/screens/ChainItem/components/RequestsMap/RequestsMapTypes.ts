import { Timeframe } from '@ankr.com/chains-list';

import { CountryMap } from 'domains/chains/actions/public/fetchChainTimeframeData';

export interface RequestsMapProps {
  loading: boolean;
  countries?: CountryMap;
  timeframe: Timeframe;
  isTitleHidden?: boolean;
}

export interface RequestsCountry {
  name: string;
  isoA2: string;
  coordinates: [number, number];
  requests?: string;
  color?: string;
}
