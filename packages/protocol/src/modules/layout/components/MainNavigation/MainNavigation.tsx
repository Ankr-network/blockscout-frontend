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
}

export const MainNavigation = ({
  loading,
  isWalletConnected,
  hasCredentials,
}: IMainNavigationProps) => {
  const items: NavigationItem[] = getNavigationList(
    isWalletConnected,
    hasCredentials,
  );

  return <Navigation loading={loading} items={items} />;
};
