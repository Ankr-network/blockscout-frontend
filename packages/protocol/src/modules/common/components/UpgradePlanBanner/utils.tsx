import { t, tHTML } from '@ankr.com/common';

import { PricingRoutesConfig } from 'domains/pricing/Routes';

import imgPremium from './assets/premium.png';
import imgFree from './assets/free.png';

const PREMIUM_BLOCK_ANCHOR = 'premiumBlock';

const getFreeUserBannerContent = () => ({
  image: imgFree,
  planTitle: t('banner.free.plan-title'),
  planDescription: tHTML('banner.free.plan-description'),
  proposalTitle: t('banner.free.proposal-title'),
  proposalDescription: tHTML('banner.free.proposal-description'),
  actionText: t('banner.free.action-text'),
  actionLink: PricingRoutesConfig.pricing.generatePath(),
  actionHash: PREMIUM_BLOCK_ANCHOR,
  actionProps: undefined,
});

const getPremiumUserBannerContent = () => ({
  image: imgPremium,
  planTitle: t('banner.premium.plan-title'),
  planDescription: tHTML('banner.premium.plan-description'),
  proposalTitle: t('banner.premium.proposal-title'),
  proposalDescription: tHTML('banner.premium.proposal-description'),
  actionText: t('banner.premium.action-text'),
  actionLink: undefined,
  actionHash: undefined,
  actionProps: undefined,
});

const getFreeUserBannerContentAdvancedApi = () => ({
  image: imgFree,
  planTitle: t('banner.free-advanced-api.plan-title'),
  planDescription: tHTML('banner.free-advanced-api.plan-description'),
  proposalTitle: t('banner.free-advanced-api.proposal-title'),
  proposalDescription: tHTML('banner.free-advanced-api.proposal-description'),
  actionText: t('banner.free-advanced-api.action-text'),
  actionLink: PricingRoutesConfig.pricing.generatePath(),
  actionHash: PREMIUM_BLOCK_ANCHOR,
  actionProps: undefined,
});

const getPremiumUserBannerContentAdvancedApi = () => ({
  image: imgPremium,
  planTitle: t('banner.premium-advanced-api.plan-title'),
  planDescription: tHTML('banner.premium-advanced-api.plan-description'),
  proposalTitle: t('banner.premium-advanced-api.proposal-title'),
  proposalDescription: tHTML(
    'banner.premium-advanced-api.proposal-description',
  ),
  actionText: t('banner.premium-advanced-api.action-text'),
  actionLink: undefined,
  actionHash: undefined,
  actionProps: undefined,
});

export const getBannerContent = (
  hasPremium: boolean,
  isAdvancedApi: boolean,
) => {
  if (isAdvancedApi) {
    return hasPremium
      ? getPremiumUserBannerContentAdvancedApi()
      : getFreeUserBannerContentAdvancedApi();
  }

  return hasPremium
    ? getPremiumUserBannerContent()
    : getFreeUserBannerContent();
};
