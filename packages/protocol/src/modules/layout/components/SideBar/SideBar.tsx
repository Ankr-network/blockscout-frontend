import { useTrackAAPI } from 'modules/layout/hooks/useTrackAAPI';
import { useTrackDashboard } from 'modules/layout/hooks/useTrackDashboard';
import { useTrackDocs } from 'modules/layout/hooks/useTrackDocs';
import { useTrackSettings } from 'modules/layout/hooks/useTrackSettings';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';

import { useStyles } from './SideBarStyles';
import { MainNavigation } from '../MainNavigation';

export interface SidebarProps {
  chainsRoutes: string[];
  className?: string;
  isLoggedIn: boolean;
  isEnterpriseClient: boolean;
  loading: boolean;
  hasLogo: boolean;
  isMobileSideBar?: boolean;
}

export const SideBar = ({
  chainsRoutes,
  className = '',
  isLoggedIn,
  isEnterpriseClient,
  loading,
  hasLogo,
  isMobileSideBar = false,
}: SidebarProps) => {
  const { classes, cx } = useStyles(isMobileSideBar);

  const { handleDisconnect } = useAuth();

  const onAAPIClick = useTrackAAPI();
  const onDocsClick = useTrackDocs();
  const onSettingsClick = useTrackSettings();
  const onDashboardClick = useTrackDashboard();

  return (
    <aside className={cx(classes.root, className)}>
      {hasLogo && <GlobalMenuWrapper />}
      <MainNavigation
        chainsRoutes={chainsRoutes}
        isLoggedIn={isLoggedIn}
        isMobileSideBar={isMobileSideBar}
        isEnterpriseClient={isEnterpriseClient}
        loading={loading}
        onAAPIClick={onAAPIClick}
        onDashboardClick={onDashboardClick}
        onDocsClick={onDocsClick}
        onSettingsClick={onSettingsClick}
        onSignOutClick={handleDisconnect}
      />
    </aside>
  );
};
