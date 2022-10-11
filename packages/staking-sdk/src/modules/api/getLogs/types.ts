export interface ILog {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  logIndex: string;
  removed: boolean;
  topics: string[];
  transactionHash: string;
  transactionIndex: string;
}

export interface IFilter {
  [key: string]: number | string | string[] | number[];
}

export type TBlockchain =
  | 'arbitrum'
  | 'avalanche'
  | 'bsc'
  | 'eth'
  | 'fantom'
  | 'polygon'
  | 'syscoin'
  | 'optimism';
