export type StatsSection = { id: StatsSectionIds; title: string; charts: Array<StatsChart> }
export type StatsSectionIds = keyof typeof StatsSectionId;
export enum StatsSectionId {
  'all',
  'accounts',
  'blocks',
  'tokens',
  'transactions',
  'gas',
}

export type StatsInterval = { id: StatsIntervalIds; title: string }
export type StatsIntervalIds = keyof typeof StatsIntervalId;
export enum StatsIntervalId {
  'all',
  'oneMonth',
  'threeMonths',
  'sixMonths',
  'oneYear',
}

export type StatsChart = {
  apiId: string;
  title: string;
  description: string;
}