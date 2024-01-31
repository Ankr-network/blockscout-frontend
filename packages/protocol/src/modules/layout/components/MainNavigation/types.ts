export interface MenuItemsParams {
  chainsRoutes: string[];
  hasProjects: boolean;
  isEnterpriseClient: boolean;
  isLoggedIn: boolean;
  isMobileSideBar: boolean;
  onDashboardClick: () => void;
  onOpenUpgradePlanDialog: () => void;
}
