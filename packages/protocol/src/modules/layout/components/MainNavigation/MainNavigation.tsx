import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { getNavigationList } from './MainNavigationUtils';

interface IMainNavigationProps {
  loading: boolean;
  hasCredentials: boolean;
  chainsRoutes: string[];
}

export const MainNavigation = ({
  loading,
  hasCredentials,
  chainsRoutes,
}: IMainNavigationProps) => {
  const items: NavigationItem[] = getNavigationList(
    chainsRoutes,
    hasCredentials,
  );

  return <Navigation loading={loading} items={items} />;
};
