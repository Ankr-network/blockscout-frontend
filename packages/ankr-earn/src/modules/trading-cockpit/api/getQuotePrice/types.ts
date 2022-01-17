type TEthereumExChange =
  | 'UniswapV2'
  | 'SushiSwap'
  | 'UniswapV3'
  | 'Curve'
  | 'BalancerV2'
  | 'KyberDMM'
  | 'ShibaSwap'
  | 'DODOv2'
  | '1Inch'
  | 'DeFiSwap'
  | 'Clipper';

type TBSCExChange =
  | 'Pancake'
  | 'PancakeV2'
  | 'Bakery'
  | 'HyperJump'
  | 'Impossible'
  | 'Julswap'
  | 'Acryptos'
  | 'Apeswap'
  | 'DODOv2'
  | 'Ellipsis'
  | 'MDex'
  | 'Nerve'
  | 'Cafeswap'
  | 'PantherSwap'
  | 'Waultswap'
  | 'Babyswap'
  | 'Biswap'
  | 'Venus'
  | 'Acsi.Finance'
  | 'Synapse'
  | 'KyberDMM'
  | 'JetSwap'
  | '1Inch'
  | 'WOOFi';

type TPolygonExChange =
  | 'Quickswap'
  | 'SushiSwap'
  | 'Cometh'
  | 'Dfyn'
  | 'PolyZap'
  | 'Curve'
  | 'Apeswap'
  | 'Waultswap'
  | 'KyberDMM'
  | 'JetSwap'
  | 'BalancerV2';

type TAvalancheExChange =
  | 'SushiSwap'
  | 'Pangolin'
  | 'TraderJoe'
  | 'Lydia'
  | 'Baguette'
  | 'KyberDMM';

export type TExChange =
  | TEthereumExChange
  | TBSCExChange
  | TPolygonExChange
  | TAvalancheExChange;

export interface IGetQuotePriceParams {
  amount: number;
  exChange: TExChange;
  inTokenSymbol: string;
  inTokenAddress: string;
  outTokenSymbol: string;
  outTokenAddress: string;
  chainId?: number;
  gasPrice?: number;
  slippage?: number;
  in_token_decimals?: number;
  out_token_decimals?: number;
}

export interface IGetQuotePriceReply {
  code: number;
  data?: {
    inToken: {
      symbol: string;
      chainId: string;
      address: string;
    };
    outToken: {
      symbol: string;
      chainId: string;
      address: string;
    };
    inAmount: string;
    outAmount: number;
    exChange: string;
    transCost: string;
    transUsd: number;
  };
  error?: {
    message: string;
    name: string;
    stack: string;
  };
}
