import { useTrackAAPI } from 'modules/layout/hooks/useTrackAAPI';
import { useTrackDashboard } from 'modules/layout/hooks/useTrackDashboard';
import { useTrackDocs } from 'modules/layout/hooks/useTrackDocs';
import { useTrackSettings } from 'modules/layout/hooks/useTrackSettings';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { Logo } from '../Logo';
import { MainNavigation } from '../MainNavigation';
import { useStyles } from './SideBarStyles';

export interface SidebarProps {
  chainsRoutes: string[];
  className?: string;
  isLoggedIn: boolean;
  isEnterpriseClient: boolean;
  loading: boolean;
  hasLogo: boolean;
  isMobileSiderBar?: boolean;
}

export const SideBar = ({
  chainsRoutes,
  className = '',
  isLoggedIn,
  isEnterpriseClient,
  loading,
  hasLogo,
  isMobileSiderBar = false,
}: SidebarProps) => {
  const { classes, cx } = useStyles(isMobileSiderBar);

  const { handleDisconnect } = useAuth();

  const onAAPIClick = useTrackAAPI();
  const onDocsClick = useTrackDocs();
  const onSettingsClick = useTrackSettings();
  const onDashboardClick = useTrackDashboard();

  return (
    <aside className={cx(classes.root, className)}>
      {hasLogo && <Logo />}
      <MainNavigation
        chainsRoutes={chainsRoutes}
        isLoggedIn={isLoggedIn}
        isMobileSiderBar={isMobileSiderBar}
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
