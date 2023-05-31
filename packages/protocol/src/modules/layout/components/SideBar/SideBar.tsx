import { Logo } from '../Logo';
import { MainNavigation } from '../MainNavigation';
import { useStyles } from './SideBarStyles';
import { useTrackAAPI } from 'modules/layout/hooks/useTrackAAPI';
import { useTrackDashboard } from 'modules/layout/hooks/useTrackDashboard';
import { useTrackDocs } from 'modules/layout/hooks/useTrackDocs';
import { useTrackSettings } from 'modules/layout/hooks/useTrackSettings';

interface SidebarProps {
  chainsRoutes: string[];
  className?: string;
  isLoggedIn: boolean;
  hasPremium: boolean;
  loading: boolean;
}

export const SideBar = ({
  chainsRoutes,
  className = '',
  isLoggedIn,
  hasPremium,
  loading,
}: SidebarProps) => {
  const { classes, cx } = useStyles();

  const onAAPIClick = useTrackAAPI();
  const onDocsClick = useTrackDocs();
  const onSettingsClick = useTrackSettings();
  const onDashboardClick = useTrackDashboard();

  return (
    <aside className={cx(classes.root, className)}>
      <Logo />
      <MainNavigation
        chainsRoutes={chainsRoutes}
        hasPremium={hasPremium}
        isLoggedIn={isLoggedIn}
        loading={loading}
        onAAPIClick={onAAPIClick}
        onDashboardClick={onDashboardClick}
        onDocsClick={onDocsClick}
        onSettingsClick={onSettingsClick}
      />
    </aside>
  );
};
