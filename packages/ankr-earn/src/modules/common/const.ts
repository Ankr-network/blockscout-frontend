import BigNumber from 'bignumber.js';

import packageJson from '../../../package.json';

import { BlockchainNetworkId, Env } from './types';

export const EARN_PATH = `${packageJson.homepage}/`;
export const UNSTAKE_PATH = `${EARN_PATH}unstake/`;
export const DOCS_LINK = 'https://docs.ankr.com/';
export const STAKEFI_LINK = 'https://stakefi.ankr.com/liquid-staking';

export const DEFAULT_ROUNDING = 2;
export const DEFAULT_FIXED = 4;
export const DECIMAL_PLACES = 4;
export const ETH_SCALE_FACTOR = 10 ** 18;

export const ACTION_CACHE_SEC = 600;

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000';
export const ZERO = new BigNumber(0);
export const ONE_ETH = new BigNumber(ETH_SCALE_FACTOR);
export const MAX_UINT256 = new BigNumber(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);

export const currentEnv: Env = process.env.REACT_APP_API_ENV
  ? (process.env.REACT_APP_API_ENV as Env)
  : Env.Stage;

export const isMainnet = currentEnv === Env.Production;

export const LITEPAPER_EN =
  'https://assets.ankr.com/files/stakefi_litepaper.pdf';
export const LITEPAPER_CN =
  'https://assets.ankr.com/files/stakefi_litepaper_cn.pdf';

export const SOCIAL_LINK = {
  discord: 'https://discord.gg/uYaNu23Ww7',
  facebook: 'facebook',
  medium: 'https://medium.com/ankr-network',
  telegram: 'https://t.me/ankrnetwork',
  telegramAnnouncements: 'https://t.me/anrknetworkann',
  twitter: 'https://twitter.com/ankr',
};

export const ANKR_1INCH_BUY_LINK =
  'https://app.1inch.io/#/1/classic/swap/ETH/ANKR';

export const featuresConfig = {
  isActiveLedgerNanoX: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActiveAVAXStaking: true,
  isActiveAVAXUnstaking: true,
  isActiveBNBStaking: true,
  isActiveBNBUnstaking: true,
  isActiveClaimNotification: false,
  liquidityMining: false,
  localeSwitcher: false,
  dashboardLiquidCrowdloanAssets: false,
  // todo: STAKAN-911 remove this flag when the feature will be done
  stakeFantom: true,
  // todo: STAKAN-935 remove this flag when the feature will be done
  unstakeFantom: true,
  // todo: STAKAN-917 remove after completion
  bridge: true,
  bridgeAnotherAddr: false,
  maxStakeAmountBtn: false,
  stakeETH: currentEnv === Env.Develop,
};

export enum SupportedChainIDS {
  MAINNET = BlockchainNetworkId.mainnet,
  GOERLI = BlockchainNetworkId.goerli,
  AVAX = BlockchainNetworkId.avalanche,
  AVAX_TESTNET = BlockchainNetworkId.avalancheTestnet,
  BSC = BlockchainNetworkId.smartchain,
  BSC_TESTNET = BlockchainNetworkId.smartchainTestnet,
  FANTOM_OPERA = BlockchainNetworkId.fantom,
  FANTOM_TESTNET = BlockchainNetworkId.fantomTestnet,
  POLYGON = BlockchainNetworkId.polygon,
}

export const EXPLORER_URLS: Record<SupportedChainIDS, string> = {
  [SupportedChainIDS.MAINNET]: 'https://etherscan.io',
  [SupportedChainIDS.GOERLI]: 'https://goerli.etherscan.io',
  [SupportedChainIDS.AVAX]: 'https://snowtrace.io',
  [SupportedChainIDS.AVAX_TESTNET]: 'https://testnet.snowtrace.io',
  [SupportedChainIDS.BSC]: 'https://bscscan.com',
  [SupportedChainIDS.BSC_TESTNET]: 'https://testnet.bscscan.com',
  [SupportedChainIDS.FANTOM_OPERA]: 'https://ftmscan.com',
  [SupportedChainIDS.FANTOM_TESTNET]: 'https://testnet.ftmscan.com',
  [SupportedChainIDS.POLYGON]: 'https://polygonscan.com',
};

export const ETH_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? BlockchainNetworkId.mainnet
    : BlockchainNetworkId.goerli;

export const AVAX_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? BlockchainNetworkId.avalanche
    : BlockchainNetworkId.avalancheTestnet;

export const BSC_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? BlockchainNetworkId.smartchain
    : BlockchainNetworkId.smartchainTestnet;

export const FTM_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? BlockchainNetworkId.fantom
    : BlockchainNetworkId.fantomTestnet;
