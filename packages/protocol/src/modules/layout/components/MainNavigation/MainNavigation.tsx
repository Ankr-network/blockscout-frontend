import React from 'react';

import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { getNavigationList } from './MainNavigationUtils';

interface IMainNavigationProps {
  loading: boolean;
  isWalletConnected: boolean;
  hasCredentials: boolean;
  chainsRoutes: string[];
}

export const MainNavigation = ({
  loading,
  isWalletConnected,
  hasCredentials,
  chainsRoutes,
}: IMainNavigationProps) => {
  const items: NavigationItem[] = getNavigationList(
    isWalletConnected,
    chainsRoutes,
    hasCredentials,
  );

  return <Navigation loading={loading} items={items} />;
};
