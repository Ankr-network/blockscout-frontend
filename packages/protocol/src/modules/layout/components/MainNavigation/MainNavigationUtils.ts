import { History } from 'history';
import { ReactComponent as ActiveBillingIcon } from 'uiKit/Icons/activeBilling.svg';
import { ReactComponent as ActiveBoxIcon } from 'uiKit/Icons/activeBox.svg';
import { ReactComponent as ActivePricingIcon } from 'uiKit/Icons/activePricing.svg';
import { ReactComponent as ActiveSettingsIcon } from 'uiKit/Icons/activeSetting.svg';
import { ReactComponent as BillingIcon } from 'uiKit/Icons/billing.svg';
import { ReactComponent as BoxIcon } from 'uiKit/Icons/box.svg';
import { ReactComponent as DocsIcon } from 'uiKit/Icons/docs.svg';
import { ReactComponent as PricingIcon } from 'uiKit/Icons/pricing.svg';
import { ReactComponent as SettingsIcon } from 'uiKit/Icons/setting.svg';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NavigationItem } from 'modules/common/components/Navigation';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

export type IsActive = (match: any, location: History['location']) => boolean;

export interface NavigationListParams {
  chainsRoutes: string[];
  hasPremium: boolean;
  onDocsClick: () => void;
  onSettingsClick: () => void;
}

export const DOC_URL = 'https://www.ankr.com/docs/build-blockchain/overview';

const isDashboardActive = (
  match: any,
  location: History['location'],
  chainsRoutes: string[],
) => {
  if (match?.isExact) return match?.isExact;

  return chainsRoutes.some(route => location.pathname.includes(route));
};

export const getNavigationList = ({
  chainsRoutes,
  hasPremium,
  onDocsClick,
  onSettingsClick,
}: NavigationListParams): NavigationItem[] => {
  return [
    {
      ActiveIcon: ActiveBoxIcon,
      StartIcon: BoxIcon,
      href: ChainsRoutesConfig.chains.generatePath(),
      isActive: (match: any, location: History['location']) =>
        isDashboardActive(match, location, chainsRoutes),
      label: t('main-navigation.endpoints'),
    },
    hasPremium
      ? {
          ActiveIcon: ActiveBillingIcon,
          StartIcon: BillingIcon,
          href: AccountRoutesConfig.accountDetails.generatePath(),
          label: t('main-navigation.billing'),
        }
      : {
          ActiveIcon: ActivePricingIcon,
          StartIcon: PricingIcon,
          href: PricingRoutesConfig.pricing.generatePath(),
          label: t('main-navigation.pricing'),
        },
    {
      StartIcon: DocsIcon,
      href: DOC_URL,
      label: t('main-navigation.docs'),
      onClick: onDocsClick,
    },
    {
      ActiveIcon: ActiveSettingsIcon,
      StartIcon: SettingsIcon,
      href: UserSettingsRoutesConfig.settings.generatePath(),
      label: t('extra-navigation.settings'),
      onClick: onSettingsClick,
    },
  ];
};
