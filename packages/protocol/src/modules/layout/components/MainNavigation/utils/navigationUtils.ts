import { NavLink, NavLinkProps, match as Match } from 'react-router-dom';
import { ButtonProps } from '@mui/material';
import { History } from 'history';
import {
  Dashboard,
  CoinStack,
  Gear,
  Doc,
  Block,
  Wallet,
  Folder,
  BoldFolder,
  AdvancedApi,
  BoldAdvancedApi,
  Logout,
  Briefcase,
} from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import {
  ENTERPRISE_ROUTE_NAME,
  EnterpriseRoutesConfig,
} from 'domains/enterprise/routes';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { NavigationItem } from 'modules/common/components/Navigation/BaseNavButton';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { track } from 'modules/analytics/mixpanel/utils/track';
import { MixpanelEvent } from 'modules/analytics/mixpanel/const';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

interface EndpointListParams {
  chainsRoutes: string[];
  hasProjects: boolean;
  isEnterpriseClient: boolean;
  isLoggedIn: boolean;
  onAAPIClick: () => void;
  onOpenUpgradePlanDialog: () => void;
  isMobileSideBar: boolean;
}

export const DOC_URL = 'https://www.ankr.com/docs/build-blockchain/overview';

const checkIsChainsRoute = (
  match: Match | null,
  { pathname }: History['location'],
  chainsRoutes: string[],
) => {
  if (pathname.includes(ENTERPRISE_ROUTE_NAME)) {
    return false;
  }

  return match?.isExact || chainsRoutes.some(route => pathname.includes(route));
};

export const getDashboardMenuList = (
  onDashboardClick: () => void,
): NavigationItem[] => [
  {
    isDisabled: false,
    StartIcon: Dashboard,
    ActiveIcon: Dashboard,
    href: DashboardRoutesConfig.dashboard.generatePath(),
    label: t('main-navigation.dashboard'),
    onClick: onDashboardClick,
  },
];

export const getEndpointsList = ({
  // TODO: hide Endpoints tab for logged in users on desktop but keep in mind the user roles restrictions and redirects (https://ankrnetwork.atlassian.net/browse/MRPC-4178)
  // isMobileSideBar,
  chainsRoutes,
  hasProjects,
  isEnterpriseClient,
  isLoggedIn,
  onAAPIClick,
  onOpenUpgradePlanDialog,
}: EndpointListParams) => {
  const items: NavigationItem[] = [
    {
      isDisabled: isEnterpriseClient,
      StartIcon: Block,
      ActiveIcon: Block,
      href: ChainsRoutesConfig.chains.generatePath({ isLoggedIn }),
      isActive: (match, location) =>
        checkIsChainsRoute(match, location, chainsRoutes),
      // TODO: hide Endpoints tab for logged in users on desktop but keep in mind the user roles restrictions and redirects (https://ankrnetwork.atlassian.net/browse/MRPC-4178)
      // isHidden: isLoggedIn && !isMobileSideBar,
      label: t('main-navigation.endpoints'),
    },
    {
      isDisabled: isEnterpriseClient,
      StartIcon: AdvancedApi,
      ActiveIcon: BoldAdvancedApi,
      href: AdvancedApiRoutesConfig.advancedApi.generatePath(),
      label: t('main-navigation.advanced-api'),
      onClick: onAAPIClick,
    },
    {
      isNotLinkItem: !isEnterpriseClient,
      StartIcon: Briefcase,
      ActiveIcon: Briefcase,
      label: t('main-navigation.enterprise'),
      href: EnterpriseRoutesConfig.chains.generatePath(),
      onClick: () => {
        track({ event: MixpanelEvent.SOON_ENTERPRISE });

        if (!isEnterpriseClient) {
          onOpenUpgradePlanDialog();
        }
      },
    },
  ];

  if (hasProjects) {
    items.push({
      isDisabled: isEnterpriseClient,
      ActiveIcon: BoldFolder,
      StartIcon: Folder,
      href: ProjectsRoutesConfig.projects.generatePath(),
      isNew: true,
      label: t('main-navigation.projects'),
    });
  }

  return items.filter(item => !item.isHidden);
};

export const getMenuList = (
  isLoggedIn: boolean,
  onDocsClick: () => void,
  isEnterpriseClient: boolean,
): NavigationItem[] => {
  const menuList = [
    {
      isDisabled: isEnterpriseClient,
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
    isDisabled: isEnterpriseClient,
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

export const getLogoutItem = (onClick: () => void): NavigationItem[] => [
  {
    StartIcon: Logout,
    ActiveIcon: Logout,
    label: t('main-navigation.logout'),
    isEnabled: true,
    onClick,
  },
];

export const getExternalButtonProps = ({
  ActiveIcon,
  StartIcon,
  isActive,
  isComingSoon,
  isDisabled,
  isEnabled,
  isNew,
  isNotLinkItem,
  ...props
}: NavigationItem): ButtonProps<'a', { component: 'a' }> => ({
  ...props,
  component: 'a',
  disabled: !isEnabled && !isComingSoon && (!props.href || isDisabled),
  href: props.href,
  key: props.label,
  onClick: props.onClick,
  rel: 'noopener noreferrer',
  target: '_blank',
  variant: 'text',
});

export const getCommonButtonProps = (
  {
    isActive,
    isComingSoon,
    isDisabled,
    isEnabled,
    onClick,
    href,
    label,
  }: NavigationItem,
  activeClassName: string,
): ButtonProps<NavLink, NavLinkProps> => ({
  activeClassName,
  disabled: !isEnabled && !isComingSoon && (!href || isDisabled),
  isActive,
  key: label,
  title: label,
  onClick,
  to: href ?? '',
  variant: 'text',
});

export const getNotLinkButtonProps = ({
  ActiveIcon,
  StartIcon,
  isActive,
  isComingSoon,
  isDisabled,
  isEnabled,
  isNew,
  isNotLinkItem,
  ...props
}: NavigationItem): ButtonProps => ({
  ...props,
  href: undefined,
  disabled: !isEnabled && !isComingSoon && (!props.href || isDisabled),
  key: props.label,
  onClick: props.onClick,
  variant: 'text',
});
