import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { getNavigationList } from './MainNavigationUtils';

interface IMainNavigationProps {
  loading: boolean;
  hasPremium: boolean;
  chainsRoutes: string[];
}

export const MainNavigation = ({
  loading,
  hasPremium,
  chainsRoutes,
}: IMainNavigationProps) => {
  const items: NavigationItem[] = getNavigationList(chainsRoutes, hasPremium);

  return <Navigation loading={loading} items={items} />;
};
