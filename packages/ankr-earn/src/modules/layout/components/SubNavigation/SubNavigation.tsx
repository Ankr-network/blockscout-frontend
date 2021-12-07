import { Navigation } from '../../../common/components/Navigation';

// TODO: add intl translation

export const SubNavigation = () => {
  const items = [
    {
      label: 'Litepaper (EN)',
      href: 'https://assets.ankr.com/files/stakefi_litepaper.pdf', // TODO: move route to const
    },
    {
      label: 'Litepaper (Ch)',
      href: 'https://assets.ankr.com/files/stakefi_litepaper_cn.pdf', // TODO: move route to const
    },
  ];

  return <Navigation items={items} />;
};
