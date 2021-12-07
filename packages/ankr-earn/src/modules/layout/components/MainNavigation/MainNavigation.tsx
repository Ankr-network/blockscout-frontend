import { Navigation } from '../../../common/components/Navigation';

// TODO: add intl translation

export const MainNavigation = () => {
  const items = [
    {
      label: 'Stake',
      href: '1', // TODO: add proper route
    },
    {
      label: 'Dashboard',
      href: '2', // TODO: add proper route
    },
    {
      label: 'Parachain',
      href: '3', // TODO: add proper route
    },
    {
      label: 'Boost',
      href: '4', // TODO: add proper route
    },
    {
      label: 'More',
      href: '5', // TODO: add proper route
    },
  ];

  return <Navigation items={items} />;
};
