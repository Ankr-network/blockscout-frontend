import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { BannerContent } from './types';
import { MAIL_TO_SALES } from 'domains/pricing/Routes';

import imgFree from './assets/free.png';
import imgPremium from './assets/premium.png';

const freeUserBannerContent: BannerContent = {
  image: imgFree,
  planDescription: t('advanced-api.banner.free.plan-description'),
  planTitle: t('advanced-api.banner.free.plan-title'),
  proposalDescription: t('advanced-api.banner.free.proposal-description'),
  proposalTitle: t('advanced-api.banner.free.proposal-title'),
  renderButton: ({ className, onClick }) => (
    <Button
      className={className}
      color="info"
      onClick={onClick}
      size="large"
      variant="contained"
    >
      {t('advanced-api.banner.free.action-text')}
    </Button>
  ),
};

const premiumUserBannerContent: BannerContent = {
  image: imgPremium,
  planDescription: t('advanced-api.banner.premium.plan-description'),
  planTitle: t('advanced-api.banner.premium.plan-title'),
  proposalDescription: t('advanced-api.banner.premium.proposal-description'),
  proposalTitle: t('advanced-api.banner.premium.proposal-title'),
  renderButton: ({ className }) => (
    <Button
      className={className}
      color="info"
      size="large"
      target="_blank"
      variant="contained"
      href={MAIL_TO_SALES}
    >
      {t('advanced-api.banner.premium.action-text')}
    </Button>
  ),
};

export const getBannerContent = (isPremium: boolean) => {
  return isPremium ? premiumUserBannerContent : freeUserBannerContent;
};
