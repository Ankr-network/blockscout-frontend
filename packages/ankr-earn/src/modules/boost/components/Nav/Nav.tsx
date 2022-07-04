import { t } from 'common';

import { RoutesConfig } from 'modules/boost/Routes';
import { BigNav } from 'modules/common/components/BigNav';
import { BigNavItem } from 'modules/common/components/BigNavItem';
import { featuresConfig } from 'modules/common/const';

export const Nav = (): JSX.Element => {
  return (
    <BigNav mb={4}>
      <BigNavItem href={RoutesConfig.tradingCockpit.path}>
        {t('boost.trading-cockpit')}
      </BigNavItem>

      {featuresConfig.liquidityMining && (
        <BigNavItem href={RoutesConfig.liquidityMining.generatePath()}>
          {t('boost.liquidity-mining')}
        </BigNavItem>
      )}
    </BigNav>
  );
};
