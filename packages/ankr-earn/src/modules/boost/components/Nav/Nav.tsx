import { t } from 'common';

import { RoutesConfig } from 'modules/boost/Routes';
import { featuresConfig } from 'modules/common/const';

import { NavItem } from '../NavItem';

import { NavComponent } from '.';

export const Nav = (): JSX.Element => {
  return (
    <NavComponent mb={4}>
      <NavItem href={RoutesConfig.tradingCockpit.path}>
        {t('boost.trading-cockpit')}
      </NavItem>

      {featuresConfig.liquidityMining && (
        <NavItem href={RoutesConfig.liquidityMining.generatePath()}>
          {t('boost.liquidity-mining')}
        </NavItem>
      )}
    </NavComponent>
  );
};
