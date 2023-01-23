import { Navigation } from 'modules/common/components/Navigation';
import { getNavigationList } from './MainNavigationUtils';

interface IMainNavigationProps {
  chainsRoutes: string[];
  hasPremium: boolean;
  loading: boolean;
  onDocsClick: () => void;
  onSettingsClick: () => void;
}

export const MainNavigation = ({
  loading,
  hasPremium,
  chainsRoutes,
  onDocsClick,
  onSettingsClick,
}: IMainNavigationProps) => {
  const items = getNavigationList({
    chainsRoutes,
    hasPremium,
    onDocsClick,
    onSettingsClick,
  });

  return <Navigation loading={loading} items={items} />;
};
