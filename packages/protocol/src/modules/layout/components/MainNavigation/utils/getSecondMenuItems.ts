import { NavBarPricing, NavBarBilling, NavBarSettings } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavigationItem } from 'modules/common/components/Navigation/BaseNavButton';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

import { ISecondMenuItemsParams } from '../types';

export const getSecondMenuItems = ({
  isEnterpriseClient,
  isLoggedIn,
  onOpenAccessDeniedDialog,
}: ISecondMenuItemsParams): NavigationItem[] => {
  const items: NavigationItem[] = [
    {
      StartIcon: NavBarPricing,
      href: PricingRoutesConfig.pricing.generatePath(),
      isDisabled: isEnterpriseClient,
      label: t('main-navigation.pricing'),
      blockName: BlockWithPermission.CommonMenuItem,
    },
    {
      StartIcon: NavBarBilling,
      href: AccountRoutesConfig.accountDetails.generatePath(),
      isDisabled: isEnterpriseClient,
      isHidden: !isLoggedIn,
      label: t('main-navigation.billing'),
      blockName: BlockWithPermission.Billing,
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
  ];

  return items.filter(item => !item.isHidden);
};
