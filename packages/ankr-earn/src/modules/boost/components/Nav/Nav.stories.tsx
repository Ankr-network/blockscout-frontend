import { NavItem } from '../NavItem';

import { NavComponent } from '.';

export default {
  title: 'modules/Boost/components/Nav',
};

export const Default = (): JSX.Element => (
  <NavComponent>
    <NavItem href="#">Trading cockpit</NavItem>

    <NavItem href="#">Liquidity mining</NavItem>
  </NavComponent>
);
