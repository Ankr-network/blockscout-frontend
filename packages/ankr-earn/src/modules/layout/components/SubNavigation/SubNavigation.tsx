import { t } from 'common';

import {
  CROWDLOAN_LITEPAPER,
  LITEPAPER_CN,
  LITEPAPER_EN,
} from 'modules/common/const';

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
      href: LITEPAPER_EN,
    },
    {
      label: t('litepaper-links.cn'),
      href: LITEPAPER_CN,
    },
    {
      label: t('litepaper-links.crowdloan'),
      href: CROWDLOAN_LITEPAPER,
    },
  ];

  return <Navigation className={className} items={items} />;
};
