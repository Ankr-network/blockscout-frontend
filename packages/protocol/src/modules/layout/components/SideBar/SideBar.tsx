import { Logo } from '../Logo';
import { MainNavigation } from '../MainNavigation';
import { useStyles } from './SideBarStyles';
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

  const onDocsClick = useTrackDocs();
  const onSettingsClick = useTrackSettings();

  return (
    <aside className={cx(classes.root, className)}>
      <Logo />
      <div>
        <MainNavigation
          chainsRoutes={chainsRoutes}
          hasPremium={hasPremium}
          loading={loading}
          onDocsClick={onDocsClick}
          onSettingsClick={onSettingsClick}
        />
      </div>
    </aside>
  );
};
