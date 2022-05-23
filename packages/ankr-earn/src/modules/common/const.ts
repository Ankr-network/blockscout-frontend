import BigNumber from 'bignumber.js';

import { AvailableReadProviders } from 'provider';

import packageJson from '../../../package.json';

import { EEthereumNetworkId, Env } from './types';

export const STAKING_PATH = `${packageJson.homepage}/`;
export const UNSTAKE_PATH = `${STAKING_PATH}unstake/`;
export const DOCS_LINK = 'https://www.ankr.com/docs/staking/overview/';
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
export const ZERO_EVENT_HASH =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

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
export const CROWDLOAN_LITEPAPER =
  'https://stakefi.ankr.com/parachain-liquid-bonding/litepaper.pdf';

export const BRIDGE_AUDIT_LINK =
  'https://assets.ankr.com/staking/ankr_bridge_security_audit.pdf';
export const BNB_AUDIT_LINK =
  'https://assets.ankr.com/staking/smart_contract_security_audit_bnb.pdf';
export const FTM_AUDIT_LINK =
  'https://assets.ankr.com/staking/smart_contract_security_audit_ftm.pdf';

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
  isActiveClaimNotification: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActivePolkadotStaking: currentEnv !== Env.Production,
  liquidityMining: false,
  localeSwitcher: false,
  dashboardLiquidCrowdloanAssets: false,
  bridgeAnotherAddr: false,
  // ! only for testing purpose
  stakeETHWithoutClaim: currentEnv !== Env.Production,
  stakeAFTMC: true,
  bnbHistory: true,
  showOldBanner: false,
  aMATICcUnstakeEnabled: true,
  isSplitedMATICHistory: true,
  maticHistory: true,
  newBinancePool: currentEnv !== Env.Production,
  dashboardNativeAmount: false,
};

export enum SupportedChainIDS {
  MAINNET = EEthereumNetworkId.mainnet,
  GOERLI = EEthereumNetworkId.goerli,
  AVAX = EEthereumNetworkId.avalanche,
  AVAX_TESTNET = EEthereumNetworkId.avalancheTestnet,
  BSC = EEthereumNetworkId.smartchain,
  BSC_TESTNET = EEthereumNetworkId.smartchainTestnet,
  FANTOM_OPERA = EEthereumNetworkId.fantom,
  FANTOM_TESTNET = EEthereumNetworkId.fantomTestnet,
  POLYGON = EEthereumNetworkId.polygon,
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
    ? EEthereumNetworkId.mainnet
    : EEthereumNetworkId.goerli;

export const AVAX_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.avalanche
    : EEthereumNetworkId.avalancheTestnet;

export const BSC_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.smartchain
    : EEthereumNetworkId.smartchainTestnet;

export const FTM_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.fantom
    : EEthereumNetworkId.fantomTestnet;

export const POLYGON_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.polygon
    : EEthereumNetworkId.smartchainTestnet;

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
