import { t, tHTML } from '@ankr.com/common';
import { MAIL_TO_SALES, PricingRoutesConfig } from 'domains/pricing/Routes';
import { PREMIUM_BLOCK_ANCHOR } from 'domains/pricing/screens/Pricing/components/PremiumBlock';
import imgPremium from './assets/premium.png';
import imgFree from './assets/free.png';

const freeUserBannerContent = {
  image: imgFree,
  planTitle: t('banner.free.plan-title'),
  planDescription: tHTML('banner.free.plan-description'),
  proposalTitle: t('banner.free.proposal-title'),
  proposalDescription: tHTML('banner.free.proposal-description'),
  actionText: t('banner.free.action-text'),
  actionLink: PricingRoutesConfig.pricing.generatePath(),
  actionHash: PREMIUM_BLOCK_ANCHOR,
  actionProps: undefined,
};

const premiumUserBannerContent = {
  image: imgPremium,
  planTitle: t('banner.premium.plan-title'),
  planDescription: tHTML('banner.premium.plan-description'),
  proposalTitle: t('banner.premium.proposal-title'),
  proposalDescription: tHTML('banner.premium.proposal-description'),
  actionText: t('banner.premium.action-text'),
  actionLink: MAIL_TO_SALES,
  actionHash: undefined,
  actionProps: { target: '_blank' },
};

const freeUserBannerContentAdvancedApi = {
  image: imgFree,
  planTitle: t('banner.free-advanced-api.plan-title'),
  planDescription: tHTML('banner.free-advanced-api.plan-description'),
  proposalTitle: t('banner.free-advanced-api.proposal-title'),
  proposalDescription: tHTML('banner.free-advanced-api.proposal-description'),
  actionText: t('banner.free-advanced-api.action-text'),
  actionLink: PricingRoutesConfig.pricing.generatePath(),
  actionHash: PREMIUM_BLOCK_ANCHOR,
  actionProps: undefined,
};

const premiumUserBannerContentAdvancedApi = {
  image: imgPremium,
  planTitle: t('banner.premium-advanced-api.plan-title'),
  planDescription: tHTML('banner.premium-advanced-api.plan-description'),
  proposalTitle: t('banner.premium-advanced-api.proposal-title'),
  proposalDescription: tHTML(
    'banner.premium-advanced-api.proposal-description',
  ),
  actionText: t('banner.premium-advanced-api.action-text'),
  actionLink: MAIL_TO_SALES,
  actionHash: undefined,
  actionProps: { target: '_blank' },
};

export const getBannerContent = (
  isPremium: boolean,
  isAdvancedApi: boolean,
) => {
  if (isAdvancedApi) {
    return isPremium
      ? premiumUserBannerContentAdvancedApi
      : freeUserBannerContentAdvancedApi;
  }
  return isPremium ? premiumUserBannerContent : freeUserBannerContent;
};
