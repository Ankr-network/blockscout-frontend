/* eslint-disable camelcase */

export type TDeFiType = 'liquidityPool' | 'farming' | 'vault';

export type TDeFiNetwork =
  | 'bnb'
  | 'ethereum'
  | 'avalanche'
  | 'fantom'
  | 'polygon';

export type TDeFiProtocol =
  | 'acryptos'
  | 'apeSwap'
  | 'beefyFinance'
  | 'convexFinance'
  | 'curveFinance'
  | 'dystopia'
  | 'ellipsisFinance'
  | 'lydiaFinance'
  | 'onxFinance'
  | 'pancakeSwap'
  | 'pangolin'
  | 'quickSwap'
  | 'sushiSwap'
  | 'traderJoe'
  | 'uniswapV2'
  | 'uniswapV3'
  | 'yearnFinance';

export interface IDeFiItemResponse {
  id: number;
  assets: string;
  network: TDeFiNetwork;
  protocol: TDeFiProtocol;
  type: TDeFiType;
  baseRewards: string;
  protocolLink: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  farmingRewards?: string;
}
