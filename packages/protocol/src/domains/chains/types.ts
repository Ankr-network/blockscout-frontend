import BigNumber from 'bignumber.js';

import { IApiChain, IApiChainURL } from './api/queryChains';
import { ChainID } from 'modules/chains/types';

export enum ChainType {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
  Devnet = 'devnet',
}

export enum SortType {
  Name = 'name',
  Usage = 'usage',
}

export enum Timeframe {
  Hour,
  Day,
  Week,
  Month,
}

export interface Chain {
  extenders?: IApiChain[];
  extensions?: IApiChain[];
  frontChain?: IApiChain['frontChain'];
  id: ChainID;
  isArchive?: boolean;
  name: string;
  totalRequests?: BigNumber;
  type: IApiChain['type'];
  urls: IApiChainURL[];
  premiumOnly?: boolean;
  coinName: string;
  isComingSoon: boolean;
  isMainnetPremiumOnly?: boolean;
}
