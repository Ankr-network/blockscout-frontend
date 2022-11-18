import { t } from '@ankr.com/common';

import { BigNav } from 'modules/common/components/BigNav';
import { BigNavItem } from 'modules/common/components/BigNavItem';

interface INavProps {
  href: string;
}

export const Nav = ({ href }: INavProps): JSX.Element => {
  return (
    <BigNav mb={4}>
      <BigNavItem href={href}>{t('defi.defi-aggregator')}</BigNavItem>
    </BigNav>
  );
};
