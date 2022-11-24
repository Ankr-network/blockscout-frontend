/* eslint-disable camelcase */

export type TDeFiType = 'liquidityPool' | 'farming' | 'vault' | 'landing';

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
  | 'spookySwap'
  | 'yearnFinance'
  | 'dotdotFinance'
  | 'kalmySwap'
  | 'lendFlare'
  | 'midasCapital'
  | 'magpie'
  | 'izumiFinance'
  | 'wombex';

interface IProtocolIcon {
  url: string;
}

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
  protocolName: string;
  protocolIcon: IProtocolIcon;
}
