import { Redirect, Route, Switch } from 'react-router-dom';

import { getRoutes as getBoostRoutes } from 'modules/boost/Routes';
import { getRoutes as getBridgeRoutes } from 'modules/bridge/Routes';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH } from 'modules/common/const';
import {
  getRoutes as getDashboardRoutes,
  RoutesConfig as DashboardRoutes,
} from 'modules/dashboard/Routes';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { getRoutes as getPolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import { getRoutes as getStakeAvalancheRoutes } from 'modules/stake-avax/Routes';
import { getRoutes as getStakeBinanceRoutes } from 'modules/stake-bnb/Routes';
import { getRoutes as getStakeEthereumRoutes } from 'modules/stake-eth/Routes';
import { getRoutes as getStakeFantomRoutes } from 'modules/stake-fantom/Routes';
import { getRoutes as getStakePolkadotRoutes } from 'modules/stake-polkadot/Routes';
import { getRoutes as getStakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { getRoutes as getStakeRoutes } from 'modules/stake/Routes';
import { getRoutes as getSwitcherRoutes } from 'modules/switcher/Routes';

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path={['/', STAKING_PATH]}>
        <Redirect to={DashboardRoutes.dashboard.generatePath()} />
      </Route>

      {getBoostRoutes()}

      {getStakeRoutes()}

      {getStakePolygonRoutes()}

      {getStakeAvalancheRoutes()}

      {getStakeBinanceRoutes()}

      {getStakeFantomRoutes()}

      {getDashboardRoutes()}

      {getSwitcherRoutes()}

      {getBridgeRoutes()}

      {getPolkadotSlotAuctionRoutes()}

      {getStakeEthereumRoutes()}

      {getStakePolkadotRoutes()}

      <Route>
        <DefaultLayout>
          <PageNotFound />
        </DefaultLayout>
      </Route>
    </Switch>
  );
}
