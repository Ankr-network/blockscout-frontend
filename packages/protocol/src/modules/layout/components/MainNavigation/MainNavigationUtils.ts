import { History } from 'history';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { CoinStack, Gear, Doc, Block, Wallet } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
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
      StartIcon: Block,
      ActiveIcon: Block,
      href: ChainsRoutesConfig.chains.generatePath(),
      isActive: (match: any, location: History['location']) =>
        isDashboardActive(match, location, chainsRoutes),
      label: t('main-navigation.endpoints'),
    },
    hasPremium
      ? {
          StartIcon: Wallet,
          ActiveIcon: Wallet,
          href: AccountRoutesConfig.accountDetails.generatePath(),
          label: t('main-navigation.billing'),
        }
      : {
          StartIcon: CoinStack,
          ActiveIcon: CoinStack,
          href: PricingRoutesConfig.pricing.generatePath(),
          label: t('main-navigation.pricing'),
        },
    {
      StartIcon: Doc,
      href: DOC_URL,
      label: t('main-navigation.docs'),
      onClick: onDocsClick,
    },
    {
      StartIcon: Gear,
      ActiveIcon: Gear,
      href: UserSettingsRoutesConfig.settings.generatePath(),
      label: t('extra-navigation.settings'),
      onClick: onSettingsClick,
    },
  ];
};
