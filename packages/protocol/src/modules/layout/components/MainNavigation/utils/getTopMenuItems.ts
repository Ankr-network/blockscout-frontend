import {
  NavBarEndpoints,
  NavBarAdvancedApi,
  NavBarAnalytics,
  NavBarEnterprise,
  NavBarProjects,
} from '@ankr.com/ui';
import { History } from 'history';
import { match as Match } from 'react-router-dom';
import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import {
  ENTERPRISE_ROUTE_NAME,
  EnterpriseRoutesConfig,
} from 'domains/enterprise/routes';
import { MixpanelEvent } from 'modules/analytics/mixpanel/const';
import { NavigationItem } from 'modules/common/components/Navigation/BaseNavButton';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { track } from 'modules/analytics/mixpanel/utils/track';
import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import { IMenuItemsParams } from '../types';

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

export const getTopMenuItems = ({
  chainsRoutes,
  hasProjects,
  isEnterpriseClient,
  isLoggedIn,
  isMobileSideBar,
  onDashboardClick,
  onOpenAccessDeniedDialog,
  onOpenUpgradePlanDialog,
}: IMenuItemsParams): NavigationItem[] => {
  const items: NavigationItem[] = [
    {
      StartIcon: NavBarEndpoints,
      href: ChainsRoutesConfig.chains.generatePath({ isLoggedIn }),
      isActive: (match, location) =>
        checkIsChainsRoute(match, location, chainsRoutes),
      isHidden: isLoggedIn && !isMobileSideBar,
      label: t('main-navigation.endpoints'),
      blockName: BlockWithPermission.CommonMenuItem,
    },
    {
      StartIcon: NavBarProjects,
      href: ProjectsRoutesConfig.projects.generatePath(),
      isDisabled: isEnterpriseClient,
      isHidden: !hasProjects,
      label: t('main-navigation.projects'),
      blockName: BlockWithPermission.ProjectsMenuItem,
      onAccessDeniedClick: onOpenAccessDeniedDialog,
    },
    {
      StartIcon: NavBarAnalytics,
      href: DashboardRoutesConfig.dashboard.generatePath(),
      isDisabled: false,
      isHidden: isMobileSideBar,
      label: t('main-navigation.analytics'),
      blockName: BlockWithPermission.AnalyticsMenuItem,
      onClick: onDashboardClick,
      onAccessDeniedClick: onOpenAccessDeniedDialog,
    },
    {
      isDisabled: isEnterpriseClient,
      StartIcon: NavBarAdvancedApi,
      href: AdvancedApiRoutesConfig.advancedApi.generatePath(),
      label: t('main-navigation.advanced-api'),
      blockName: BlockWithPermission.AdvancedApiMenuItem,
      onAccessDeniedClick: onOpenAccessDeniedDialog,
    },
    {
      StartIcon: NavBarEnterprise,
      href: EnterpriseRoutesConfig.chains.generatePath(),
      isHidden: isMobileSideBar,
      isNotLinkItem: !isEnterpriseClient,
      label: t('main-navigation.enterprise'),
      blockName: BlockWithPermission.CommonMenuItem,
      onClick: () => {
        track({ event: MixpanelEvent.SOON_ENTERPRISE });

        if (!isEnterpriseClient) {
          onOpenUpgradePlanDialog();
        }
      },
    },
  ];

  return items.filter(item => !item.isHidden);
};
