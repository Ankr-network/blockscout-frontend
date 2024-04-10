import BigNumber from 'bignumber.js';

import { Env } from '../types/types';

export const currentEnv: Env = process.env.REACT_APP_API_ENV
  ? (process.env.REACT_APP_API_ENV as Env)
  : Env.Stage;

export const isMainnet = currentEnv === Env.Production;

export const ZERO = new BigNumber(0);

export enum MilliSeconds {
  Second = 1000,
  Minute = Second * 60,
  Hour = Minute * 60,
  Day = Hour * 24,
}

export const TWITTER_COLOR = '#479AE9';
export const DISCORD_COLOR = '#5865F2';
export const ANKR_DOCS_LINK = 'https://www.ankr.com/docs/';
export const ANKR_DOCS_PROJECTS_LINK =
  'https://www.ankr.com/docs/rpc-service/getting-started/projects/';
export const ANKR_DISCORD_LINK = 'https://discord.ankr.com/';
export const ANKR_TWITTER_LINK = 'https://twitter.com/ankr';
export const ANKR_BLOG_LINK = 'https://medium.com/ankr-network';
export const ANKR_GETTING_STARTED_PREMIUM_LINK =
  'https://www.ankr.com/docs/rpc-service/getting-started/basics-premium/';
export const ANKR_PRICING_LINK =
  'https://www.ankr.com/docs/rpc-service/pricing/';
export const ANKR_CHAINS_LINK =
  'https://www.ankr.com/docs/rpc-service/chains/chains-list/#chains-supported';
export const ANKR_DOCS_TEAM_ACCOUNTS_LINK =
  'https://www.ankr.com/docs/rpc-service/getting-started/team-accounts';
export const ANKR_DOCS_INVITE_TEAMMATE_LINK =
  'https://www.ankr.com/docs/rpc-service/getting-started/team-accounts/#invite-teammates';
export const ANKR_DOCS_TEAM_ACCESS_ROLES_LINK =
  'https://www.ankr.com/docs/rpc-service/getting-started/team-accounts/#edit-access-roles';

export const TEAM_INVITE_LINK_KEY = 'teamInviteLink';

export const ACTION_TEN_MINUTES_CACHE = 6000;

export const CHARGING_MODEL_DEAL_DOCS_LINK =
  'https://www.ankr.com/docs/rpc-service/service-plans/#deal';
