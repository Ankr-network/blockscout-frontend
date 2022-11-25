import { History } from 'history';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ReactComponent as BoxIcon } from 'uiKit/Icons/box.svg';
import { ReactComponent as ActiveBoxIcon } from 'uiKit/Icons/activeBox.svg';
import { ReactComponent as BillingIcon } from 'uiKit/Icons/billing.svg';
import { ReactComponent as ActiveBillingIcon } from 'uiKit/Icons/activeBilling.svg';
import { ReactComponent as PricingIcon } from 'uiKit/Icons/pricing.svg';
import { ReactComponent as ActivePricingIcon } from 'uiKit/Icons/activePricing.svg';
import { ReactComponent as DocsIcon } from 'uiKit/Icons/docs.svg';
import { ReactComponent as SettingsIcon } from 'uiKit/Icons/setting.svg';
import { ReactComponent as ActiveSettingsIcon } from 'uiKit/Icons/activeSetting.svg';
import { t } from '@ankr.com/common';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavigationItem } from 'modules/common/components/Navigation';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

export type IsActive = (match: any, location: History['location']) => boolean;

export const DOC_URL = 'https://www.ankr.com/docs/build-blockchain/overview';

const isDashboardActive = (
  match: any,
  location: History['location'],
  chainsRoutes: string[],
) => {
  if (match?.isExact) return match?.isExact;

  return chainsRoutes.some(route => location.pathname.includes(route));
};

export const getNavigationList = (
  chainsRoutes: string[],
  hasCredentials: boolean,
  isMobile?: boolean,
): NavigationItem[] => {
  const list: NavigationItem[] = [
    {
      label: t('main-navigation.endpoints'),
      StartIcon: BoxIcon,
      ActiveIcon: ActiveBoxIcon,
      href: ChainsRoutesConfig.chains.generatePath(),
      isActive: (match: any, location: History['location']) =>
        isDashboardActive(match, location, chainsRoutes),
    },
    hasCredentials && {
      label: t('main-navigation.billing'),
      StartIcon: BillingIcon,
      ActiveIcon: ActiveBillingIcon,
      href: AccountRoutesConfig.accountDetails.generatePath(),
    },
    !hasCredentials && {
      label: t('main-navigation.pricing'),
      StartIcon: PricingIcon,
      ActiveIcon: ActivePricingIcon,
      href: PricingRoutesConfig.pricing.generatePath(),
    },
    {
      label: t('main-navigation.docs'),
      StartIcon: DocsIcon,
      href: DOC_URL,
    },
    isMobile && {
      label: t('extra-navigation.settings'),
      StartIcon: SettingsIcon,
      ActiveIcon: ActiveSettingsIcon,
      href: UserSettingsRoutesConfig.settings.generatePath(),
    },
  ].filter(Boolean) as NavigationItem[];

  return list;
};
