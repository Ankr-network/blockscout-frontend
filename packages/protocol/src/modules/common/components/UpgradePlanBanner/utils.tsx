import { t, tHTML } from '@ankr.com/common';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { PREMIUM_BLOCK_ANCHOR } from 'domains/pricing/screens/Pricing/components/PremiumBlock';
import imgPremium from './assets/premium.png';
import imgFree from './assets/free.png';
import imgPublic from './assets/public.png';

const publicUserBannerContent = {
  image: imgPublic,
  planTitle: t('banner.public.plan-title'),
  planDescription: tHTML('banner.public.plan-description'),
  proposalTitle: t('banner.public.proposal-title'),
  proposalDescription: tHTML('banner.public.proposal-description'),
  actionText: t('banner.public.action-text'),
  actionProps: undefined,
};

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
  actionLink: undefined,
  actionHash: undefined,
  actionProps: undefined,
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
  actionLink: undefined,
  actionHash: undefined,
  actionProps: undefined,
};

export const getBannerContent = (
  hasPremium: boolean,
  isAdvancedApi: boolean,
  isPublicUser: boolean,
) => {
  if (isPublicUser) {
    return publicUserBannerContent;
  }

  if (isAdvancedApi) {
    return hasPremium
      ? premiumUserBannerContentAdvancedApi
      : freeUserBannerContentAdvancedApi;
  }
  return hasPremium ? premiumUserBannerContent : freeUserBannerContent;
};
