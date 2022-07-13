import { t } from 'common';

import { LITEPAPER_LINK } from 'modules/common/const';

import { Navigation } from '../../../common/components/Navigation';

interface ISubNavigation {
  className?: string;
}

export const SubNavigation = ({
  className = '',
}: ISubNavigation): JSX.Element => {
  const items = [
    {
      label: t('litepaper-links.en'),
      href: LITEPAPER_LINK.stakingEN,
    },
    {
      label: t('litepaper-links.cn'),
      href: LITEPAPER_LINK.stakingCN,
    },
    {
      label: t('litepaper-links.crowdloan'),
      href: LITEPAPER_LINK.crowdloan,
    },
  ];

  return <Navigation className={className} items={items} />;
};
