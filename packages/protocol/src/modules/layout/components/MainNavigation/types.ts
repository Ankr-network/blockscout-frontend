export interface MenuItemsParams {
  chainsRoutes: string[];
  hasProjects: boolean;
  isEnterpriseClient: boolean;
  isLoggedIn: boolean;
  isMobileSideBar: boolean;
  onDashboardClick: () => void;
  onOpenUpgradePlanDialog: () => void;
  onOpenAccessDeniedDialog: () => void;
}

export interface BottomMenuItemsParams {
  isLoggedIn: boolean;
  isEnterpriseClient: boolean;
  onDocsClick: () => void;
  onOpenAccessDeniedDialog: () => void;
}
