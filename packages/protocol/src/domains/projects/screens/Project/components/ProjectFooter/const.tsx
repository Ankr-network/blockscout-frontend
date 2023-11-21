import { t } from '@ankr.com/common';
import { Discord, Twitter, Medium } from '@ankr.com/ui';
import { ButtonProps } from '@mui/material';

import {
  ANKR_BLOG_LINK,
  ANKR_CHAINS_LINK,
  ANKR_DISCORD_LINK,
  ANKR_GETTING_STARTED_PREMIUM_LINK,
  ANKR_PRICING_LINK,
  ANKR_TWITTER_LINK,
  DISCORD_COLOR,
  TWITTER_COLOR,
} from 'modules/common/constants/const';
import { INavLinkProps } from 'uiKit/NavLink';

type LinkProps = ButtonProps & INavLinkProps;

export const docsLinks: LinkProps[] = [
  {
    children: t('project.footer.docs.getting-started'),
    href: ANKR_GETTING_STARTED_PREMIUM_LINK,
  },
  {
    children: t('project.footer.docs.pricing'),
    href: ANKR_PRICING_LINK,
  },
  {
    children: t('project.footer.docs.supported-chains'),
    href: ANKR_CHAINS_LINK,
  },
];

export const socialLinks: LinkProps[] = [
  {
    startIcon: <Discord style={{ color: DISCORD_COLOR }} />,
    children: t('project.footer.social-links.discord'),
    href: ANKR_DISCORD_LINK,
  },
  {
    startIcon: <Twitter style={{ color: TWITTER_COLOR }} />,
    children: t('project.footer.social-links.twitter'),
    href: ANKR_TWITTER_LINK,
  },
  {
    startIcon: <Medium />,
    children: t('project.footer.social-links.blog'),
    href: ANKR_BLOG_LINK,
  },
];
