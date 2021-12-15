import { RoutesConfig } from 'modules/boost/Routes';
import { featuresConfig } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { NavComponent } from '.';
import { NavItem } from '../NavItem';

export const Nav = () => {
  return (
    <NavComponent mb={4}>
      <NavItem href={RoutesConfig.tradingCockpit.generatePath()}>
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
