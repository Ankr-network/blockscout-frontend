import { BigNavItem } from '../BigNavItem';

import { BigNav } from '.';

export default {
  title: 'modules/Boost/components/Nav',
};

export const Default = (): JSX.Element => (
  <BigNav>
    <BigNavItem href="#">Trading cockpit</BigNavItem>

    <BigNavItem href="#">Liquidity mining</BigNavItem>
  </BigNav>
);
