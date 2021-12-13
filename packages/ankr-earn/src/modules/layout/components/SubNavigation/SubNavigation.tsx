import { LITEPAPER_CN, LITEPAPER_EN } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { FC } from 'react';
import { Navigation } from '../../../common/components/Navigation';

interface ISubNavigation {
  className?: string;
}

export const SubNavigation: FC<ISubNavigation> = ({ className = '' }) => {
  const items = [
    {
      label: t('litepaper-links.en'),
      href: LITEPAPER_EN,
    },
    {
      label: t('litepaper-links.cn'),
      href: LITEPAPER_CN,
    },
  ];

  return <Navigation className={className} items={items} />;
};
