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
  | 'avalanche_fuji'
  | 'bsc'
  | 'eth'
  | 'eth_goerli'
  | 'fantom'
  | 'polygon'
  | 'syscoin'
  | 'optimism';
