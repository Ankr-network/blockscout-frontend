import packageJson from '../../../../package.json';

import { SupportedChainIDS } from './supportedChainIDS';

export const STAKING_PATH = `${packageJson.homepage}/`;
export const UNSTAKE_PATH = `${STAKING_PATH}unstake/`;

const DOCS_ROOT_LINK = 'https://www.ankr.com/docs/';
export const DOCS_OVERVIEW_LINK = `${DOCS_ROOT_LINK}staking/overview/`;
export const DOCS_STAKE_ETH_LINK = `${DOCS_ROOT_LINK}staking/liquid-staking/eth/stake-eth`;
export const DOCS_DEFI_DEX_LINK = `${DOCS_ROOT_LINK}staking/defi/provide-liquidity-to-dex`;
export const DOCS_DEFI_FARM_LINK = `${DOCS_ROOT_LINK}staking/defi/yield-farm`;
export const DOCS_DEFI_POOLS_LINK = `${DOCS_ROOT_LINK}staking/defi/liquidity-pools/`;
export const DOCS_DEFI_VAULTS_LINK = `${DOCS_ROOT_LINK}staking/defi/vaults`;
export const DOCS_ANKR_TOKEN_STAKING_LINK = `${DOCS_ROOT_LINK}staking/delegated-staking/ankr/overview`;

export const ANKR_ETH_LANDING = 'https://www.ankr.com/ethereum-liquid-staking/';
export const ANKR_MATIC_LANDING =
  'https://www.ankr.com/polygon-liquid-staking/';
export const ANKR_BNB_LANDING = 'https://www.ankr.com/bnb-liquid-staking/';

export const STAKEFI_LINK = 'https://old-stakefi.ankr.com/liquid-staking';

export const LITEPAPER_LINK = {
  stakingEN: 'https://assets.ankr.com/files/stakefi_litepaper.pdf',
  stakingCN: 'https://assets.ankr.com/files/stakefi_litepaper_cn.pdf',
  crowdloan:
    'https://assets.ankr.com/files/parachain-liquid-bonding-litepaper.pdf',
};

export const AUDIT_LINKS = {
  bridge: 'https://assets.ankr.com/staking/ankr_bridge_security_audit.pdf',
  bnbBeosin:
    'https://assets.ankr.com/staking/smart_contract_security_audit_bnb.pdf',
  bnbPeckShield:
    'https://assets.ankr.com/staking/smart_contract_security_audit_bnb_peckshield.pdf',
  ftm: 'https://assets.ankr.com/staking/smart_contract_security_audit_ftm.pdf',
  matic:
    'https://assets.ankr.com/staking/smart_contract_security_audit_matic.pdf',
  avax: 'https://assets.ankr.com/staking/smart_contract_security_audit_avax_beosin.pdf',
  eth: 'https://assets.ankr.com/files/stkr_smart_contract_auditing_report.pdf',
};

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

export const OPENOCEAN_CLASSIC_URL = 'https://app.openocean.finance/CLASSIC#';

export const OPENOCEAN_QUOTE_URL =
  'https://open-api.openocean.finance/v1/cross/quote';

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
