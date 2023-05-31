import { NavLink, NavLinkProps } from 'react-router-dom';
import { ButtonProps } from '@mui/material';
import { History } from 'history';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import {
  Dashboard,
  CoinStack,
  Gear,
  Doc,
  Block,
  Wallet,
  AdvancedApi,
  BoldAdvancedApi,
} from '@ankr.com/ui';
import { Diamonds } from 'uiKit/Icons/Diamonds';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavigationItem } from 'modules/common/components/Navigation/BaseNavButton';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { track } from 'modules/analytics/mixpanel/utils/track';
import { MixpanelEvent } from 'modules/analytics/mixpanel/const';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';

export type IsActive = (match: any, location: History['location']) => boolean;

export interface EndpointListParams {
  chainsRoutes: string[];
  onAAPIClick: () => void;
}

export interface NavigationListParams extends EndpointListParams {
  isLoggedIn: boolean;
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

export const getCommonMenuList = (
  onDashboardClick: () => void,
): NavigationItem[] => [
  {
    StartIcon: Dashboard,
    ActiveIcon: Dashboard,
    href: DashboardRoutesConfig.dashboard.generatePath(),
    label: t('main-navigation.dashboard'),
    onClick: onDashboardClick,
  },
];

const getAdvancedApiList = (onAAPIClick: () => void): NavigationItem[] => [
  {
    StartIcon: AdvancedApi,
    ActiveIcon: BoldAdvancedApi,
    href: AdvancedApiRoutesConfig.advancedApi.generatePath(),
    label: t('main-navigation.advanced-api'),
    onClick: onAAPIClick,
  },
];

export const getEndpointsList = ({
  chainsRoutes,
  onAAPIClick,
}: EndpointListParams): NavigationItem[] => [
  {
    StartIcon: Block,
    ActiveIcon: Block,
    href: ChainsRoutesConfig.chains.generatePath(),
    isActive: (match: any, location: History['location']) =>
      isDashboardActive(match, location, chainsRoutes),
    label: t('main-navigation.endpoints'),
  },
  ...getAdvancedApiList(onAAPIClick),
  {
    StartIcon: Diamonds,
    ActiveIcon: Diamonds,
    isComingSoon: true,
    label: t('main-navigation.enterprise'),
    onClick: () => track({ event: MixpanelEvent.SOON_ENTERPRISE }),
    isDisabled: true,
  },
];

export const getMenuList = (
  isLoggedIn: boolean,
  onDocsClick: () => void,
): NavigationItem[] => {
  const menuList = [
    {
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
  ];

  const billingItem = {
    StartIcon: Wallet,
    ActiveIcon: Wallet,
    href: AccountRoutesConfig.accountDetails.generatePath(),
    label: t('main-navigation.billing'),
  };

  if (isLoggedIn) {
    menuList.splice(1, 0, billingItem);
  }

  return menuList;
};

export const getSettingList = (
  onSettingsClick: () => void,
): NavigationItem[] => [
  {
    StartIcon: Gear,
    ActiveIcon: Gear,
    href: UserSettingsRoutesConfig.settings.generatePath(),
    label: t('main-navigation.settings'),
    onClick: onSettingsClick,
  },
];

export const getNavigationList = ({
  chainsRoutes,
  isLoggedIn,
  onAAPIClick,
  onDocsClick,
  onSettingsClick,
}: NavigationListParams): NavigationItem[] => [
  getEndpointsList({ chainsRoutes, onAAPIClick })[0],
  ...getAdvancedApiList(onAAPIClick),
  ...getMenuList(isLoggedIn, onDocsClick),
  ...getSettingList(onSettingsClick),
];

export const getExternalButtonProps = ({
  ActiveIcon,
  StartIcon,
  isActive,
  isComingSoon,
  isDisabled,
  ...props
}: NavigationItem): ButtonProps<'a', { component: 'a' }> => ({
  ...props,
  component: 'a',
  disabled: !isComingSoon && (!props.href || isDisabled),
  href: props.href,
  key: props.label,
  onClick: props.onClick,
  rel: 'noopener noreferrer',
  target: '_blank',
  variant: 'text',
});

export const getCommonButtonProps = (
  {
    ActiveIcon,
    StartIcon,
    isActive,
    isComingSoon,
    isDisabled,
    ...props
  }: NavigationItem,
  activeClassName: string,
): ButtonProps<NavLink, NavLinkProps> => ({
  ...props,
  activeClassName,
  disabled: !isComingSoon && (!props.href || isDisabled),
  isActive,
  key: props.label,
  onClick: props.onClick,
  to: props.href ?? '',
  variant: 'text',
});
