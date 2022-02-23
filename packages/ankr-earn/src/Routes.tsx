import { Redirect, Route, Switch } from 'react-router-dom';

import { getRoutes as getBoostRoutes } from 'modules/boost/Routes';
import { getRoutes as getBridgeRoutes } from 'modules/bridge/Routes';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { EARN_PATH, featuresConfig } from 'modules/common/const';
import {
  getRoutes as getDashboardRoutes,
  RoutesConfig as DashboardRoutes,
} from 'modules/dashboard/Routes';
import { getRoutes as getETH2SwapRoutes } from 'modules/eth2Swap/Routes';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { getRoutes as getPolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import { getRoutes as getStakeBinanceRoutes } from 'modules/stake-bnb/Routes';
import { getRoutes as getStakeFantomRoutes } from 'modules/stake-fantom/Routes';
import { getRoutes as getStakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { getRoutes as getStakeRoutes } from 'modules/stake/Routes';

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path={['/', EARN_PATH]}>
        <Redirect to={DashboardRoutes.dashboard.generatePath()} />
      </Route>

      {getBoostRoutes()}

      {getStakeRoutes()}

      {getStakePolygonRoutes()}

      {featuresConfig.isActiveBNBStaking && getStakeBinanceRoutes()}

      {featuresConfig.stakeFantom && getStakeFantomRoutes()}

      {getDashboardRoutes()}

      {/* TODO: STAKAN-990 remove eth2Swap flag when feature is done */}

      {featuresConfig.eth2Swap && getETH2SwapRoutes()}

      {featuresConfig.bridge && getBridgeRoutes()}

      {getPolkadotSlotAuctionRoutes()}

      <Route>
        <DefaultLayout>
          <PageNotFound />
        </DefaultLayout>
      </Route>
    </Switch>
  );
}
