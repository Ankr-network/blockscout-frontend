export interface IMenuItemsParams {
  chainsRoutes: string[];
  hasProjects: boolean;
  isEnterpriseClient: boolean;
  isPersonalGroup: boolean;
  isLoggedIn: boolean;
  isMobileSideBar: boolean;
  notificationsAmount: number;
  onDashboardClick: () => void;
  onOpenUpgradePlanDialog: () => void;
  onOpenAccessDeniedDialog: () => void;
}

export interface ISecondMenuItemsParams {
  isLoggedIn: boolean;
  isEnterpriseClient: boolean;
  onOpenAccessDeniedDialog: () => void;
}
