import { TNumberAsString, Web3Address } from 'modules/common/types';

/**
 * Available OpenOcean chains
 * https://docs.openocean.finance/dev/supported-chains
 */
export type TOpenOceanChains =
  | 'eth'
  | 'bsc'
  | 'okex'
  | 'polygon'
  | 'xdai'
  | 'heco'
  | 'boba'
  | 'avax'
  | 'arbitrum'
  | 'optimism'
  | 'moonriver'
  | 'aurora'
  | 'cronos'
  | 'harmony'
  | 'fantom';

/**
 * https://open-api.openocean.finance/v3/:chain/quote
 */
export interface IGetOpenOceanQuoteParams {
  inTokenAddress: Web3Address;
  outTokenAddress: Web3Address;
  /**
   * Token amount without decimals
   */
  amount: TNumberAsString;
  /**
   * without decimals
   */
  gasPrice: TNumberAsString;
  /**
   * 1 equals 1%, 1%-100%
   */
  slippage: TNumberAsString;
  /**
   * 1, 2
   */
  disabledDexIds?: TNumberAsString;
}

interface IOpenOceanToken {
  symbol: string;
  name: string;
  address: Web3Address;
  decimals: number;
}

interface IOpenOceanDex {
  dexIndex: number;
  dexCode: string;
  swapAmount: number;
}

export interface IGetOpenOceanQuoteData {
  inToken: IOpenOceanToken;
  outToken: IOpenOceanToken;
  inAmount: TNumberAsString;
  outAmount: TNumberAsString;
  estimatedGas: TNumberAsString;
  dexes: IOpenOceanDex[];
  path: Record<string, unknown>;
}

export interface IGetOpenOceanQuote {
  code?: number;
  data?: IGetOpenOceanQuoteData;
  error?: string;
  message?: string;
}
