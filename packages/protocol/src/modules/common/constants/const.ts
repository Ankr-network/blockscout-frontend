import BigNumber from 'bignumber.js';

import { Env } from '../types/types';

export const currentEnv: Env = process.env.REACT_APP_API_ENV
  ? (process.env.REACT_APP_API_ENV as Env)
  : Env.Stage;

export const isMainnet = currentEnv === Env.Production;

export const ZERO = new BigNumber(0);

export const TWITTER_COLOR = '#479AE9';
export const DISCORD_COLOR = '#5865F2';
export const ANKR_DOCS_LINK = 'https://www.ankr.com/docs/';
export const ANKR_DOCS_PROJECTS_LINK =
  'https://www.ankr.com/docs/rpc-service/getting-started/projects/';
export const ANKR_DISCORD_LINK = 'https://discord.com/invite/ankr/';
export const ANKR_TWITTER_LINK = 'https://twitter.com/ankr';
export const ANKR_BLOG_LINK = 'https://medium.com/ankr-network';
export const ANKR_GETTING_STARTED_PREMIUM_LINK =
  'https://www.ankr.com/docs/rpc-service/getting-started/basics-premium/';
export const ANKR_PRICING_LINK =
  'https://www.ankr.com/docs/rpc-service/pricing/';
export const ANKR_CHAINS_LINK =
  'https://www.ankr.com/docs/rpc-service/chains/chains-list/#chains-supported';
