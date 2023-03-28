import { Logo } from '../Logo';
import { MainNavigation } from '../MainNavigation';
import { useStyles } from './SideBarStyles';
import { useTrackAAPI } from 'modules/layout/hooks/useTrackAAPI';
import { useTrackDocs } from 'modules/layout/hooks/useTrackDocs';
import { useTrackSettings } from 'modules/layout/hooks/useTrackSettings';

interface SidebarProps {
  chainsRoutes: string[];
  className?: string;
  isLoggedIn: boolean;
  loading: boolean;
}

export const SideBar = ({
  chainsRoutes,
  className = '',
  isLoggedIn,
  loading,
}: SidebarProps) => {
  const { classes, cx } = useStyles();

  const onAAPIClick = useTrackAAPI();
  const onDocsClick = useTrackDocs();
  const onSettingsClick = useTrackSettings();

  return (
    <aside className={cx(classes.root, className)}>
      <Logo />
      <MainNavigation
        chainsRoutes={chainsRoutes}
        isLoggedIn={isLoggedIn}
        loading={loading}
        onAAPIClick={onAAPIClick}
        onDocsClick={onDocsClick}
        onSettingsClick={onSettingsClick}
      />
    </aside>
  );
};
