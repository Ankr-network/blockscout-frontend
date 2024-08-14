import { NavBarPricing, NavBarBilling, NavBarSettings, ReferralIcon } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { NavigationItem } from 'modules/common/components/Navigation/BaseNavButton';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { referralRoutesConfig } from 'domains/referral/routes';

import { ISecondMenuItemsParams } from '../types';

export const getSecondMenuItems = ({
  isEnterpriseClient,
  isLoggedIn,
  onOpenAccessDeniedDialog,
}: ISecondMenuItemsParams): NavigationItem[] => {
  const items: NavigationItem[] = [
    {
      StartIcon: NavBarPricing,
      blockName: BlockWithPermission.CommonMenuItem,
      href: PricingRoutesConfig.pricing.generatePath(),
      isDisabled: isEnterpriseClient,
      label: t('main-navigation.pricing'),
    },
    {
      StartIcon: NavBarBilling,
      blockName: BlockWithPermission.Billing,
      href: AccountRoutesConfig.accountDetails.generatePath(),
      isDisabled: isEnterpriseClient,
      isHidden: !isLoggedIn,
      label: t('main-navigation.billing'),
      onAccessDeniedClick: onOpenAccessDeniedDialog,
    },
    {
      StartIcon: NavBarSettings,
      href: UserSettingsRoutesConfig.settings.generatePath(),
      isDisabled: false,
      isHidden: !isLoggedIn,
      label: t('main-navigation.settings'),
      blockName: BlockWithPermission.CommonMenuItem,
      onAccessDeniedClick: onOpenAccessDeniedDialog,
    },
    {
      StartIcon: ReferralIcon,
      blockName: BlockWithPermission.CommonMenuItem,
      href: referralRoutesConfig.referral.generatePath(),
      isHidden: !isLoggedIn,
      label: t('main-navigation.referral'),
    },
  ];

  return items.filter(item => !item.isHidden);
};
