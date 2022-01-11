import { Env } from './types';

export const EMPTY_PATH = '/';
export const INDEX_PATH = '/liquid-staking';
export const PARACHAIN_BONDING_PATH = '/parachain-liquid-bonding';
export const UNSTAKE_PATH = `${INDEX_PATH}/unstake`;

export const DEFAULT_ROUNDING = 2;
export const DEFAULT_FIXED = 4;
export const DECIMAL_PLACES = 4;
export const ETH_DIVIDER = 10 ** 18;
export const ETH_SCALE_FACTOR = 10 ** 18;

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

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
  liquidityMining: false,
  demoStaking: true,
};
