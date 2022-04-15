import BigNumber from 'bignumber.js';

import { AvailableReadProviders } from 'provider';

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

export const ETH_RPC_URL = process.env.REACT_APP_ETH_RPC;
export const MIXPANEL_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN as string;

export const LITEPAPER_EN =
  'https://assets.ankr.com/files/stakefi_litepaper.pdf';
export const LITEPAPER_CN =
  'https://assets.ankr.com/files/stakefi_litepaper_cn.pdf';

export const BRIDGE_AUDIT_LINK =
  'https://assets.ankr.com/earn/ankr_bridge_security_audit.pdf';

export const SOCIAL_LINK = {
  discord: 'https://discord.gg/uYaNu23Ww7',
  facebook: 'facebook',
  medium: 'https://medium.com/ankr-network',
  telegram: 'https://t.me/ankrnetwork',
  telegramAnnouncements: 'https://t.me/anrknetworkann',
  twitter: 'https://twitter.com/ankr',
};

export const STAKE_LEGACY_LINKS = {
  DOT: 'https://stakefi.ankr.com/liquid-staking/DOT',
  ETH: 'https://stakefi.ankr.com/liquid-staking/ETH',
  KSM: 'https://stakefi.ankr.com/liquid-staking/KSM',
  WND: 'https://stakefi.ankr.com/liquid-staking/WND',
};

export const ANKR_1INCH_BUY_LINK =
  'https://app.1inch.io/#/1/classic/swap/ETH/ANKR';

export const featuresConfig = {
  isActiveAVAXStaking: true,
  isActiveAVAXUnstaking: true,
  isActiveClaimNotification: false,
  isActivePolkadotClaiming: currentEnv === Env.Develop,
  isActivePolkadotUnstaking: currentEnv === Env.Develop,
  isActivePolkadotWallet: currentEnv === Env.Develop,
  isActiveMyRewardsClaimModalNewParts: false,
  liquidityMining: false,
  localeSwitcher: false,
  dashboardLiquidCrowdloanAssets: false,
  // todo: STAKAN-917 remove after completion
  bridge: true,
  bridgeAnotherAddr: false,
  maxStakeAmountBtn: false,
  switcherBnb: currentEnv !== Env.Production,
  stakeETH: currentEnv !== Env.Production,
  // todo: remove after completion of https://ankrnetwork.atlassian.net/browse/STAKAN-1228
  stakeAbnbc: true,
  // todo: https://ankrnetwork.atlassian.net/browse/STAKAN-1302
  bnbHistory: false,
};

export enum SupportedChainIDS {
  // ETH Compatible
  MAINNET = BlockchainNetworkId.mainnet,
  GOERLI = BlockchainNetworkId.goerli,
  AVAX = BlockchainNetworkId.avalanche,
  AVAX_TESTNET = BlockchainNetworkId.avalancheTestnet,
  BSC = BlockchainNetworkId.smartchain,
  BSC_TESTNET = BlockchainNetworkId.smartchainTestnet,
  FANTOM_OPERA = BlockchainNetworkId.fantom,
  FANTOM_TESTNET = BlockchainNetworkId.fantomTestnet,
  POLYGON = BlockchainNetworkId.polygon,

  // Polkadot Compatible
  DOT = BlockchainNetworkId.polkadot,
  KSM = BlockchainNetworkId.kusama,
  ROC = BlockchainNetworkId.rococo,
  WND = BlockchainNetworkId.westend,
}

export const EXPLORER_URLS: Record<SupportedChainIDS, string> = {
  // ETH Compatible
  [SupportedChainIDS.MAINNET]: 'https://etherscan.io',
  [SupportedChainIDS.GOERLI]: 'https://goerli.etherscan.io',
  [SupportedChainIDS.AVAX]: 'https://snowtrace.io',
  [SupportedChainIDS.AVAX_TESTNET]: 'https://testnet.snowtrace.io',
  [SupportedChainIDS.BSC]: 'https://bscscan.com',
  [SupportedChainIDS.BSC_TESTNET]: 'https://testnet.bscscan.com',
  [SupportedChainIDS.FANTOM_OPERA]: 'https://ftmscan.com',
  [SupportedChainIDS.FANTOM_TESTNET]: 'https://testnet.ftmscan.com',
  [SupportedChainIDS.POLYGON]: 'https://polygonscan.com',

  // Polkadot Compatible
  [SupportedChainIDS.DOT]: 'https://polkadot.subscan.io',
  [SupportedChainIDS.KSM]: 'https://kusama.subscan.io',
  [SupportedChainIDS.ROC]: 'https://rococo.subscan.io',
  [SupportedChainIDS.WND]: 'https://westend.subscan.io',
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

export const POLYGON_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? BlockchainNetworkId.polygon
    : BlockchainNetworkId.smartchainTestnet;

export const ETH_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.ethMainnet
    : AvailableReadProviders.ethGoerli;

export const AVAX_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.avalancheChain
    : AvailableReadProviders.avalancheChainTest;

export const BSC_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.binanceChain
    : AvailableReadProviders.binanceChainTest;

export const FTM_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.ftmOpera
    : AvailableReadProviders.ftmTestnet;

export const POLYGON_PROVIDER_BY_ENV =
  currentEnv === Env.Production
    ? AvailableReadProviders.polygon
    : AvailableReadProviders.mumbai;
