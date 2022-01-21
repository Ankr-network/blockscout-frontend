// import { getRoutes as getBoostRoutes } from 'modules/boost/Routes';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import {
  EMPTY_PATH,
  isMainnet,
  PARACHAIN_BONDING_PATH,
} from 'modules/common/const';
import { EParachainPolkadotNetwork } from 'modules/common/types';
// import {
//   getRoutes as getDashboardRoutes,
//   RoutesConfig as DashboardRoutes,
// } from 'modules/dashboard/Routes';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import {
  getRoutes as getPolkadotSlotAuctionRoutes,
  RoutesConfig as PolkadotSlotAuctionRoutes,
} from 'modules/polkadot-slot-auction/Routes';
// import { getRoutes as getStakePolygonRoutes } from 'modules/stake-polygon/Routes';
// import { getRoutes as getStakeRoutes } from 'modules/stake/Routes';
import { Redirect, Route, Switch } from 'react-router-dom';

/**
 *  TODO Please uncomment routes after the release and add fixes
 */
export function Routes() {
  return (
    <Switch>
      <Route path={['/', EMPTY_PATH, PARACHAIN_BONDING_PATH]} exact>
        {/*<Redirect to={DashboardRoutes.dashboard.generatePath()} />*/}
        <Redirect
          to={PolkadotSlotAuctionRoutes.crowdloans.generatePath(
            isMainnet
              ? EParachainPolkadotNetwork.DOT.toLowerCase()
              : EParachainPolkadotNetwork.WND.toLowerCase(),
          )}
        />
      </Route>

      {/*{getBoostRoutes()}*/}
      {/*{getStakeRoutes()}*/}
      {/*{getStakePolygonRoutes()}*/}
      {/*{getDashboardRoutes()}*/}
      {getPolkadotSlotAuctionRoutes()}

      <Route>
        <DefaultLayout>
          <PageNotFound />
        </DefaultLayout>
      </Route>
    </Switch>
  );
}
