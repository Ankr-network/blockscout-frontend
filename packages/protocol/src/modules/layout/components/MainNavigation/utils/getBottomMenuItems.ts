import { Coins, Doc, Wallet } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { DOC_URL } from 'modules/layout/const';
import { NavigationItem } from 'modules/common/components/Navigation/BaseNavButton';
import { PricingRoutesConfig } from 'domains/pricing/Routes';

export const getBottomMenuItems = (
  isLoggedIn: boolean,
  onDocsClick: () => void,
  isEnterpriseClient: boolean,
): NavigationItem[] => {
  const items: NavigationItem[] = [
    {
      StartIcon: Coins,
      href: PricingRoutesConfig.pricing.generatePath(),
      isDisabled: isEnterpriseClient,
      label: t('main-navigation.pricing'),
    },
    {
      StartIcon: Wallet,
      href: AccountRoutesConfig.accountDetails.generatePath(),
      isDisabled: isEnterpriseClient,
      isHidden: !isLoggedIn,
      label: t('main-navigation.billing'),
    },
    {
      StartIcon: Doc,
      href: DOC_URL,
      label: t('main-navigation.docs'),
      onClick: onDocsClick,
    },
  ];

  return items.filter(item => !item.isHidden);
};
