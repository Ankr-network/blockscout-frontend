import { IDeFiItemResponse } from './types';

export const DEFI_MOCK: IDeFiItemResponse[] = [
  {
    id: 1,
    assets: 'aETHb/ETH',
    baseRewards: 'aETHb/ETH',
    created_at: '2022-09-09T16:26:57.514Z',
    farmingRewards: '',
    network: 'bnb',
    protocol: 'acryptos',
    protocolLink: 'https://app.acryptos.com/stableswap/deposit/aethb/',
    published_at: '2022-09-09T16:54:59.866Z',
    type: 'liquidityPool',
    updated_at: '2022-09-09T16:54:59.882Z',
  },
  {
    id: 2,
    assets: 'aETHc/ETH Curve LP',
    baseRewards: 'aethCRV',
    created_at: '2022-09-09T16:26:57.514Z',
    farmingRewards: 'CRV, CVX',
    network: 'ethereum',
    protocol: 'convexFinance',
    protocolLink: 'https://www.convexfinance.com/stake',
    published_at: '2022-09-09T16:54:59.866Z',
    type: 'farming',
    updated_at: '2022-09-09T16:54:59.882Z',
  },
];
