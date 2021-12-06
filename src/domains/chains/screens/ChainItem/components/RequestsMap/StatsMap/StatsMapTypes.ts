import { RequestsCountry } from '../RequestsMapTypes';

export interface StatsMapProps {
  data: RequestsCountry[];
  setCountry: (country: string) => void;
}
