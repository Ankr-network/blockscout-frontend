import { Logo } from '../Logo';
import { MainNavigation } from '../MainNavigation';
import { useStyles } from './SideBarStyles';
import { useTrackAAPI } from 'modules/layout/hooks/useTrackAAPI';
import { useTrackDocs } from 'modules/layout/hooks/useTrackDocs';
import { useTrackSettings } from 'modules/layout/hooks/useTrackSettings';

interface SidebarProps {
  chainsRoutes: string[];
  className?: string;
  hasPremium: boolean;
  loading: boolean;
}

export const SideBar = ({
  chainsRoutes,
  className = '',
  hasPremium,
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
        hasPremium={hasPremium}
        loading={loading}
        onAAPIClick={onAAPIClick}
        onDocsClick={onDocsClick}
        onSettingsClick={onSettingsClick}
      />
    </aside>
  );
};
