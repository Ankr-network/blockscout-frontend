import { t } from '@ankr.com/common';

import { BannerContent } from './types';

import imgFree from './assets/free.png';
import imgPremium from './assets/premium.png';

const freeUserBannerContent: BannerContent = {
  image: imgFree,
  planTitle: t('advanced-api.banner.free.plan-title'),
  planDescription: t('advanced-api.banner.free.plan-description'),
  proposalTitle: t('advanced-api.banner.free.proposal-title'),
  proposalDescription: t('advanced-api.banner.free.proposal-description'),
};

const premiumUserBannerContent: BannerContent = {
  image: imgPremium,
  planTitle: t('advanced-api.banner.premium.plan-title'),
  planDescription: t('advanced-api.banner.premium.plan-description'),
  proposalTitle: t('advanced-api.banner.premium.proposal-title'),
  proposalDescription: t('advanced-api.banner.premium.proposal-description'),
};

export const getBannerContent = (isPremium: boolean) => {
  return isPremium ? premiumUserBannerContent : freeUserBannerContent;
};
