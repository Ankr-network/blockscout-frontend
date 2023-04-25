export interface LocationsTableProps {
  nodesRows: IContinentsCount[];
}

export interface ProviderRow {
  continent: string;
  isFree?: boolean;
  isPremium?: boolean;
}

export interface IContinentsCount {
  continent: string;
  isPremium: boolean;
  count: number;
  freePercent: string;
  premiumPercent: string;
}
