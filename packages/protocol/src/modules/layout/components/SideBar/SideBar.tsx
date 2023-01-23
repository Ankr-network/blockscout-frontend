import { Logo } from '../Logo';
import { MainNavigation } from '../MainNavigation';
import { useStyles } from './SideBarStyles';

interface SidebarProps {
  className?: string;
  loading: boolean;
  hasPremium: boolean;
  chainsRoutes: string[];
}

export const SideBar = ({
  className = '',
  loading,
  hasPremium,
  chainsRoutes,
}: SidebarProps) => {
  const { classes, cx } = useStyles();

  return (
    <aside className={cx(classes.root, className)}>
      <Logo />
      <div>
        <MainNavigation
          loading={loading}
          hasPremium={hasPremium}
          chainsRoutes={chainsRoutes}
        />
      </div>
    </aside>
  );
};
