import BigNumber from 'bignumber.js';

import { Address, AvailableReadProviders } from '@ankr.com/provider';

import packageJson from '../../../package.json';

import { EEthereumNetworkId, Env } from './types';
import { Token } from './types/token';

export const STAKING_PATH = `${packageJson.homepage}/`;
export const UNSTAKE_PATH = `${STAKING_PATH}unstake/`;

const DOCS_ROOT_LINK = 'https://www.ankr.com/docs/';
export const DOCS_OVERVIEW_LINK = `${DOCS_ROOT_LINK}staking/overview/`;
export const DOCS_STAKE_ETH_LINK = `${DOCS_ROOT_LINK}staking/liquid-staking/eth/stake-eth`;
export const DOCS_DEFI_DEX_LINK = `${DOCS_ROOT_LINK}staking/defi/provide-liquidity-to-dex`;
export const DOCS_DEFI_FARM_LINK = `${DOCS_ROOT_LINK}staking/defi/yield-farm`;

export const STAKEFI_LINK = 'https://old-stakefi.ankr.com/liquid-staking';

export const DEFAULT_ROUNDING = 2;
export const DEFAULT_FIXED = 4;
export const DECIMAL_PLACES = 4;
export const ETH_DECIMALS = 18;
export const ETH_SCALE_FACTOR = 10 ** ETH_DECIMALS;

export const ACTION_CACHE_SEC = 600;

export const OPENOCEAN_MAX_SAFE_GAS_VALUE = 300; // Note: "5_000" is a maximum

export const ZERO_ADDR: Address = '0x0000000000000000000000000000000000000000';
export const ZERO = new BigNumber(0);
export const ONE = new BigNumber(1);
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
export const isLocal = !!process.env.REACT_APP_IS_LOCAL;

export const ETH_RPC_URL = process.env.REACT_APP_ETH_RPC;
export const MIXPANEL_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN as string;

export const LITEPAPER_LINK = {
  stakingEN: 'https://assets.ankr.com/files/stakefi_litepaper.pdf',
  stakingCN: 'https://assets.ankr.com/files/stakefi_litepaper_cn.pdf',
  crowdloan:
    'https://assets.ankr.com/files/parachain-liquid-bonding-litepaper.pdf',
};

export const BRIDGE_AUDIT_LINK =
  'https://assets.ankr.com/staking/ankr_bridge_security_audit.pdf';
export const BNB_AUDIT_LINK =
  'https://assets.ankr.com/staking/smart_contract_security_audit_bnb.pdf';
export const FTM_AUDIT_LINK =
  'https://assets.ankr.com/staking/smart_contract_security_audit_ftm.pdf';
export const MATIC_AUDIT_LINK =
  'https://assets.ankr.com/staking/smart_contract_security_audit_matic.pdf';

export const SOCIAL_LINK = {
  discord: 'https://discord.gg/hs2SK9pBXP',
  medium: 'https://medium.com/ankr-network',
  telegram: 'https://t.me/ankrstaking',
  twitter: 'https://twitter.com/ankrstaking',
};

export const STAKE_LEGACY_LINKS = {
  DOT: 'https://old-stakefi.ankr.com/liquid-staking/DOT',
  ETH: 'https://old-stakefi.ankr.com/liquid-staking/ETH',
  KSM: 'https://old-stakefi.ankr.com/liquid-staking/KSM',
  WND: 'https://old-stakefi.ankr.com/liquid-staking/WND',
};

export const ANKR_1INCH_BUY_LINK =
  'https://app.1inch.io/#/1/classic/swap/ETH/ANKR';

export const OPENOCEAN_CLASSIC_URL = 'https://openocean.finance/classic#';

export const OPENOCEAN_QUOTE_URL =
  'https://open-api.openocean.finance/v1/cross/quote';

export const featuresConfig = {
  testingUi: currentEnv !== Env.Production,
  isActiveClaimNotification: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActivePolkadotLedgerNanoX: false,
  isActiveStakeTradeInfo: true,
  liquidityMining: false,
  localeSwitcher: false,
  dashboardLiquidCrowdloanAssets: false,
  bridgeAnotherAddr: false,
  showOldBanner: false,
  dashboardNativeAmount: false,
  // ! only for testing purpose
  stakeETHWithoutClaim: currentEnv !== Env.Production,
  avaxSwitcher: true,
  isActivePolkadotClaiming: true,
  isActivePolkadotStaking: true,
  ankrStaking: currentEnv !== Env.Production,
  mgnoStaking: currentEnv !== Env.Production,
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
  POLYGON_MUMBAI_TESTNET = EEthereumNetworkId.mumbai,
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
  [SupportedChainIDS.POLYGON_MUMBAI_TESTNET]: 'https://mumbai.polygonscan.com',
};

export const ETH_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.mainnet
    : EEthereumNetworkId.goerli;

export const ANKR_NETWORK_BY_ENV =
  currentEnv === Env.Production
    ? EEthereumNetworkId.mainnet
    : EEthereumNetworkId.goerli;

// todo: use actual networks
export const GNO_NETWORK_BY_ENV =
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
    : EEthereumNetworkId.mumbai;

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

export const nativeTokenMap: Partial<Record<Token, Token>> = {
  [Token.aAVAXb]: Token.AVAX,
  [Token.aAVAXc]: Token.AVAX,
  [Token.aBNBb]: Token.BNB,
  [Token.aBNBc]: Token.BNB,
  [Token.aETH]: Token.ETH,
  [Token.aETHb]: Token.ETH,
  [Token.aETHc]: Token.ETH,
  [Token.aFTMb]: Token.FTM,
  [Token.aFTMc]: Token.FTM,
  [Token.aMATICb]: Token.MATIC,
  [Token.aMATICc]: Token.MATIC,
};
