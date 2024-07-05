export interface IMenuItemsParams {
  chainsRoutes: string[];
  hasProjects: boolean;
  isEnterpriseClient: boolean;
  isLoggedIn: boolean;
  isMobileSideBar: boolean;
  onDashboardClick: () => void;
  onOpenUpgradePlanDialog: () => void;
  onOpenAccessDeniedDialog: () => void;
}

export interface ISecondMenuItemsParams {
  isLoggedIn: boolean;
  isEnterpriseClient: boolean;
  onOpenAccessDeniedDialog: () => void;
}
