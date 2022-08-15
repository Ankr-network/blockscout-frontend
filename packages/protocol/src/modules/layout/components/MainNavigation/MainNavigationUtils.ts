import { History } from 'history';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ReactComponent as BoxIcon } from 'uiKit/Icons/box.svg';
import { ReactComponent as BillingIcon } from 'uiKit/Icons/billing.svg';
import { ReactComponent as PricingIcon } from 'uiKit/Icons/pricing.svg';
import { ReactComponent as DocsIcon } from 'uiKit/Icons/docs.svg';
import { ReactComponent as SettingsIcon } from 'uiKit/Icons/setting.svg';
import { t } from 'common';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavigationItem } from 'modules/common/components/Navigation';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

export type IsActive = (match: any, location: History['location']) => boolean;

export const DOC_URL = 'https://www.ankr.com/docs/build-blockchain/overview';
export const FAQ_URL = 'https://docs.ankr.com/ankr-protocol/faqs';

const isDashboardActive = (
  match: any,
  location: History['location'],
  chainsRoutes: string[],
) => {
  if (match?.isExact) return match?.isExact;

  return chainsRoutes.some(route => location.pathname.includes(route));
};

export const getNavigationList = (
  isWalletConnected: boolean,
  chainsRoutes: string[],
  hasCredentials: boolean,
  isMobile?: boolean,
): NavigationItem[] => {
  const list: NavigationItem[] = [
    {
      label: t('main-navigation.endpoints'),
      StartIcon: BoxIcon,
      href: ChainsRoutesConfig.chains.generatePath(),
      isActive: (match: any, location: History['location']) =>
        isDashboardActive(match, location, chainsRoutes),
    },
    (isWalletConnected || hasCredentials) && {
      label: t('main-navigation.billing'),
      StartIcon: BillingIcon,
      href: AccountRoutesConfig.accountDetails.generatePath(),
    },
    !hasCredentials && {
      label: t('main-navigation.pricing'),
      StartIcon: PricingIcon,
      href: PricingRoutesConfig.pricing.generagePath(),
    },
    {
      label: t('main-navigation.docs'),
      StartIcon: DocsIcon,
      href: DOC_URL,
    },
    isMobile && {
      label: t('extra-navigation.settings'),
      StartIcon: SettingsIcon,
      href: UserSettingsRoutesConfig.settings.generatePath(),
    },
  ].filter(Boolean) as NavigationItem[];

  return list;
};
