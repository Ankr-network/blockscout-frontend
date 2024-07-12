import BigNumber from 'bignumber.js';

import { Env } from '../types/types';

export const currentEnv: Env = process.env.REACT_APP_API_ENV
  ? (process.env.REACT_APP_API_ENV as Env)
  : Env.Stage;

export const isMainnet = currentEnv === Env.Production;

export const ZERO = new BigNumber(0);

export const ONE_STRING = '1';
export const ZERO_STRING = '0';

export const DEFAULT_TOKEN_DECIMALS = 18;

export enum EMilliSeconds {
  Second = 1000,
  Minute = Second * 60,
  Hour = Minute * 60,
  Day = Hour * 24,
  Week = Day * 7,
  Month = Day * 30,
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
export const ANKR_TERMS_OF_SERVICE_LINK = 'https://www.ankr.com/terms/';
export const ANKR_PRIVACY_POLICY_LINK = 'https://www.ankr.com/privacy-policy/';

export const AAPI_PYTHON_SDK = 'https://pypi.org/project/ankr-sdk/';
export const AAPI_JS_SDK = 'https://www.npmjs.com/package/@ankr.com/ankr.js';
export const AAPI_OVERVIEW_LINK =
  'https://www.ankr.com/docs/advanced-api/overview/';
export const AAPI_CHAINS_LINK =
  'https://www.ankr.com/docs/advanced-api/overview/#chains-supported';
export const AAPI_REACT_HOOKS_LINK =
  'https://www.ankr.com/docs/advanced-api/react-hooks/';

export const TEAM_INVITE_LINK_KEY = 'teamInviteLink';

export const ACTION_TEN_MINUTES_CACHE = 6000;

export const CHARGING_MODEL_DEAL_DOCS_LINK =
  'https://www.ankr.com/docs/rpc-service/service-plans/#deal';

export const INTEGER_REGEX = /[^0-9]/;
