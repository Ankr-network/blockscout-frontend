import { Address, EEthereumNetworkId } from '@ankr.com/provider';

import { TNumberAsString } from 'modules/common/types';

type TOpenOceanExChange = 'openoceanv2';

export type TOpenOceanNetworks = 'AVAX' | 'BSC' | 'ETH' | 'FANTOM' | 'POLYGON';

export type TOpenOceanTokens =
  | 'AVAX'
  | 'BNB'
  | 'ETH'
  | 'FTM'
  | 'MATIC'
  | 'aAVAXb'
  | 'aAVAXc'
  | 'aBNBb'
  | 'aBNBc'
  | 'aETHb'
  | 'aETHc'
  | 'aFTMb'
  | 'aFTMc'
  | 'aMATICb'
  | 'aMATICc';

export interface IGetOpenOceanQuoteParams {
  amount: number;
  chainId: EEthereumNetworkId;
  exChange: TOpenOceanExChange;
  gasPrice: number;
  inTokenAddress: Address;
  inTokenSymbol: TOpenOceanTokens;
  // eslint-disable-next-line camelcase
  in_token_decimals: number;
  outTokenAddress: Address;
  outTokenSymbol: TOpenOceanTokens;
  // eslint-disable-next-line camelcase
  out_token_decimals: number;
  slippage: number;
}

export interface IGetOpenOceanQuoteData {
  exChange: TOpenOceanExChange;
  inAmount: TNumberAsString;
  inToken: {
    address: Address;
    chainId: EEthereumNetworkId;
    symbol: TOpenOceanTokens;
  };
  outAmount: number;
  outToken: {
    address: Address;
    chainId: EEthereumNetworkId;
    symbol: TOpenOceanTokens;
  };
  transCost: TNumberAsString;
}

export interface IGetOpenOceanQuote {
  code?: number;
  data?: IGetOpenOceanQuoteData;
  error?: string;
  message?: string;
}
