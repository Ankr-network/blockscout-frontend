export enum ChainType {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export enum Period {
  Day = '24h',
  Week = '7d',
  Month = '30d',
}

export interface MethodRequest {
  method: string;
  calls: number;
}
