export interface LocationsTableProps {
  shouldShowRealNodesRatio: boolean;
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
  freeCount: number;
  premiumCount: number;
  freePercent: string;
  premiumPercent: string;
  multiplier: number;
}
