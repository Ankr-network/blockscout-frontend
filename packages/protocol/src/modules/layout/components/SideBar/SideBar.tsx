import classNames from 'classnames';

import { ExtraNavigation } from '../ExtraNavigation';
import { Logo } from '../Logo';
import { MainNavigation } from '../MainNavigation';
import { useStyles } from './SideBarStyles';

interface SidebarProps {
  className?: string;
  loading: boolean;
  isWalletConnected: boolean;
  hasCredentials: boolean;
  chainsRoutes: string[];
}

export const SideBar = ({
  className = '',
  loading,
  isWalletConnected,
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
          isWalletConnected={isWalletConnected}
          hasCredentials={hasCredentials}
          chainsRoutes={chainsRoutes}
        />
        <ExtraNavigation />
      </div>
    </aside>
  );
};
