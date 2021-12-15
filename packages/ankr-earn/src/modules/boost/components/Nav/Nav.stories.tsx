import { NavComponent } from '.';
import { NavItem } from '../NavItem';

export default {
  title: 'modules/Boost/components/Nav',
};

export const Default = () => (
  <NavComponent>
    <NavItem href="#">Trading cockpit</NavItem>
    <NavItem href="#">Liquidity mining</NavItem>
  </NavComponent>
);
