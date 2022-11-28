import classNames from 'classnames';

import { Logo } from '../Logo';
import { MainNavigation } from '../MainNavigation';
import { useStyles } from './SideBarStyles';

interface SidebarProps {
  className?: string;
  loading: boolean;
  hasCredentials: boolean;
  chainsRoutes: string[];
}

export const SideBar = ({
  className = '',
  loading,
  hasCredentials,
  chainsRoutes,
}: SidebarProps) => {
  const classes = useStyles();

  return (
    <aside className={classNames(classes.root, className)}>
      <Logo />
      <div>
        <MainNavigation
          loading={loading}
          hasCredentials={hasCredentials}
          chainsRoutes={chainsRoutes}
        />
      </div>
    </aside>
  );
};
