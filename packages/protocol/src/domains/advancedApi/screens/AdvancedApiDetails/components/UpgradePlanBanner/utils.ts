import { t } from '@ankr.com/common';
import { MAIL_TO_SALES, PricingRoutesConfig } from 'domains/pricing/Routes';
import { PREMIUM_BLOCK_ANCHOR } from 'domains/pricing/screens/Pricing/components/PremiumBlock';
import imgPremium from './assets/premium.png';
import imgFree from './assets/free.png';

const freeUserBannerContent = {
  image: imgFree,
  planTitle: t('advanced-api.banner.free.plan-title'),
  planDescription: t('advanced-api.banner.free.plan-description'),
  proposalTitle: t('advanced-api.banner.free.proposal-title'),
  proposalDescription: t('advanced-api.banner.free.proposal-description'),
  actionText: t('advanced-api.banner.free.action-text'),
  actionLink: PricingRoutesConfig.pricing.generatePath(),
  actionHash: PREMIUM_BLOCK_ANCHOR,
  actionProps: undefined,
};

const premiumUserBannerContent = {
  image: imgPremium,
  planTitle: t('advanced-api.banner.premium.plan-title'),
  planDescription: t('advanced-api.banner.premium.plan-description'),
  proposalTitle: t('advanced-api.banner.premium.proposal-title'),
  proposalDescription: t('advanced-api.banner.premium.proposal-description'),
  actionText: t('advanced-api.banner.premium.action-text'),
  actionLink: MAIL_TO_SALES,
  actionHash: undefined,
  actionProps: { target: '_blank' },
};

export const getBannerContent = (isPremium: boolean) => {
  return isPremium ? premiumUserBannerContent : freeUserBannerContent;
};
