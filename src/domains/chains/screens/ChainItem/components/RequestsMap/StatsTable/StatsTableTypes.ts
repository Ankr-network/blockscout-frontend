import { RequestsCountry } from '../RequestsMapTypes';

export interface StatsTableProps {
  data: RequestsCountry[];
  selectedCountry: string;
}
