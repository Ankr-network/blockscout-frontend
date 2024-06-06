import { NavBarPricing, NavBarBilling, NavBarDocs } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { DOC_URL } from 'modules/layout/const';
import { NavigationItem } from 'modules/common/components/Navigation/BaseNavButton';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import { BottomMenuItemsParams } from '../types';

export const getBottomMenuItems = ({
  isEnterpriseClient,
  isLoggedIn,
  onDocsClick,
  onOpenAccessDeniedDialog,
}: BottomMenuItemsParams): NavigationItem[] => {
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
      StartIcon: NavBarDocs,
      href: DOC_URL,
      label: t('main-navigation.docs'),
      blockName: BlockWithPermission.CommonMenuItem,
      onClick: onDocsClick,
    },
  ];

  return items.filter(item => !item.isHidden);
};
