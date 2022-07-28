import React from 'react';

import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { getNavigationList } from './MainNavigationUtils';

interface IMainNavigationProps {
  isWalletConnected: boolean;
  hasCredentials: boolean;
}

export const MainNavigation = ({
  isWalletConnected,
  hasCredentials,
}: IMainNavigationProps) => {
  const items: NavigationItem[] = getNavigationList(
    isWalletConnected,
    hasCredentials,
  );

  return <Navigation items={items} />;
};
