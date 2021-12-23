import { createRouteConfig } from '../../../router/utils/createRouteConfig';

export interface IMenuLink {
  title: string;
  link?: string;
  subtitle?: string;
  isPostForm?: boolean;
  children?: { [key: string]: IMenuLink };
}

export const CRYPTO_WIDGET_SCRIPT_SRC =
  'https://crypto.com/price/static/widget/index.js';

const COMMUNITY_LINK = 'https://medium.com/ankr-network';

const ANKR_APP = 'https://app.ankr.com';

export const SOCIAL_LINK = {
  ankrMain: ANKR_APP,
  medium: COMMUNITY_LINK,
  telegram: 'https://t.me/ankrnetwork',
  twitter: 'https://twitter.com/ankr',
  github: 'https://github.com/Ankr-network/',
  kakao: 'https://open.kakao.com/o/g7Knr09',
  youTube: 'https://www.youtube.com/channel/UCr6z1C2Ti0DOS_zNqh62U-A',
  instagram: 'https://www.instagram.com/ankr_cloud/',
  linkedin: 'https://www.linkedin.com/company/ankr/',
  discord: 'https://discord.gg/uYaNu23Ww7',
  reddit: 'https://www.reddit.com/r/Ankrofficial/',
  coinMarketCap: 'https://coinmarketcap.com/currencies/ankr/',
  coinGecko: 'https://coingecko.com/en/coins/ankr-network',
  blockfolio: 'https://blockfolio.com/coin/ANKR',
  crypto: 'https://crypto.com/price/ankr',
};

const STAKEFI_LINK = 'https://stakefi.ankr.com';
const STAKEFI_LIQUID_STAKING_LINK = `${STAKEFI_LINK}/liquid-staking`;

const ANKR_COM = '';

const BUILD_PATH = `${ANKR_COM}/build`;
const BUILD_NODES_PATH = `${BUILD_PATH}/nodes`;
const BuildRoutesConfig = createRouteConfig(
  {
    build: {
      path: BUILD_PATH,
      generatePath: () => BUILD_PATH,
    },
    buildNodes: {
      path: BUILD_NODES_PATH,
      generatePath: () => BUILD_NODES_PATH,
    },
  },
  BUILD_PATH,
);
const BUILD_NODES_ITEM = {
  nodes: {
    link: BuildRoutesConfig.buildNodes.generatePath(),
    title: 'navigation.products-deploy',
  },
};

const ABOUT_PATH = `${ANKR_COM}/about`;
const ABOUT_OUR_PURPOSE_PATH = `${ABOUT_PATH}/our-purpose`;
const ABOUT_TEAM_PATH = `${ABOUT_PATH}/team`;
const ABOUT_CAREERS_PATH = `${ABOUT_PATH}/careers`;
const AboutRoutesConfig = createRouteConfig(
  {
    about: {
      path: ABOUT_PATH,
      generatePath: () => ABOUT_PATH,
    },
    aboutOurPurpose: {
      path: ABOUT_OUR_PURPOSE_PATH,
      generatePath: () => ABOUT_OUR_PURPOSE_PATH,
    },
    aboutTeam: {
      path: ABOUT_TEAM_PATH,
      generatePath: () => ABOUT_TEAM_PATH,
    },
    aboutCareers: {
      path: ABOUT_CAREERS_PATH,
      generatePath: () => ABOUT_CAREERS_PATH,
    },
  },
  ABOUT_PATH,
);

const ASSETS_PATH = `${ANKR_COM}/assets`;
const AssetsRoutesConfig = createRouteConfig(
  {
    assets: {
      path: ASSETS_PATH,
      generatePath: () => ASSETS_PATH,
    },
  },
  ASSETS_PATH,
);

const TERMS_PATH = `${ANKR_COM}/terms`;
const TermsRouteConfig = createRouteConfig(
  {
    terms: {
      path: TERMS_PATH,
      generatePath: () => TERMS_PATH,
    },
  },
  TERMS_PATH,
);
const TERMS_ITEM = {
  terms: {
    link: TermsRouteConfig.terms.generatePath(),
    title: 'footer.term-of-use',
  },
};

const POLICY_PATH = `${ANKR_COM}/privacy-policy`;
const PolicyRouteConfig = createRouteConfig(
  {
    policy: {
      path: POLICY_PATH,
      generatePath: () => POLICY_PATH,
    },
  },
  POLICY_PATH,
);
const PRIVACY_ITEM = {
  privacy: {
    link: PolicyRouteConfig.policy.generatePath(),
    title: 'footer.privacy-policy',
  },
};

const PROTOCOL_PATH = `${ANKR_COM}/ankr-protocol`;
const ProtocolRouteConfig = createRouteConfig(
  {
    protocol: {
      path: PROTOCOL_PATH,
      generatePath: () => PROTOCOL_PATH,
    },
  },
  PROTOCOL_PATH,
);
const PROTOCOL_LANDING_ITEM = {
  protocol: {
    link: ProtocolRouteConfig.protocol.generatePath(),
    title: 'navigation.ankr-protocol',
  },
};

const FOOTER_PRODUCT_ITEMS = {
  title: 'navigation.products',
  children: {
    productsDeploy: {
      link: BUILD_NODES_ITEM.nodes.link,
      title: 'navigation.node-service',
    },
    internetBonds: {
      link: STAKEFI_LIQUID_STAKING_LINK,
      title: 'navigation.ankr-earn',
    },

    /* tmp link for stage redirecting */
    ...PROTOCOL_LANDING_ITEM,
  },
};

const FOOTER_COMPANY_ITEMS_V3 = {
  title: 'navigation.about-us',
  children: {
    company: {
      link: AboutRoutesConfig.aboutOurPurpose.generatePath(),
      title: 'navigation.about-company',
    },
    careers: {
      link: AboutRoutesConfig.aboutCareers.generatePath(),
      title: 'navigation.about-careers',
    },
    team: {
      link: AboutRoutesConfig.aboutTeam.generatePath(),
      title: 'navigation.about-team',
    },
    community: {
      link: COMMUNITY_LINK,
      title: 'navigation.community',
    },
    assets: {
      link: AssetsRoutesConfig.assets.generatePath(),
      title: 'navigation.assets',
    },
  },
};

const FOOTER_SOCIALS_V3 = {
  title: 'navigation.socials',
  children: {
    twitter: {
      link: SOCIAL_LINK.twitter,
      title: 'social-media.list.twitter.title',
    },
    telegram: {
      link: SOCIAL_LINK.telegram,
      title: 'social-media.list.telegram.title',
    },
    discord: {
      link: SOCIAL_LINK.discord,
      title: 'social-media.list.discord.title',
    },
    medium: {
      link: SOCIAL_LINK.medium,
      title: 'social-media.list.medium.title',
    },
    reddit: {
      link: SOCIAL_LINK.reddit,
      title: 'social-media.list.reddit.title',
    },
  },
};

export const FOOTER_ITEMS_V3 = {
  FOOTER_PRODUCT_ITEMS,
  FOOTER_COMPANY_ITEMS_V3,
  FOOTER_SOCIALS_V3,
};

export const FOOTER_PRIVACY_ITEMS = {
  ...TERMS_ITEM,
  ...PRIVACY_ITEM,
};
