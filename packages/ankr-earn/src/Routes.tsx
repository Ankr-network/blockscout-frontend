import { getRoutes as getBoostRoutes } from 'modules/boost/Routes';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { EARN_PATH, featuresConfig, isMainnet } from 'modules/common/const';
import { EParachainPolkadotNetwork } from 'modules/common/types';
import {
  getRoutes as getDashboardRoutes,
  RoutesConfig as DashboardRoutes,
} from 'modules/dashboard/Routes';
import { getRoutes as getETH2SwapRoutes } from 'modules/eth2Swap/Routes';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import {
  getRoutes as getPolkadotSlotAuctionRoutes,
  RoutesConfig as PolkadotSlotAuctionRoutes,
} from 'modules/polkadot-slot-auction/Routes';
import { getRoutes as getStakeFantomRoutes } from 'modules/stake-fantom/Routes';
import { getRoutes as getStakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { getRoutes as getStakeRoutes } from 'modules/stake/Routes';
import { Redirect, Route, Switch } from 'react-router-dom';

/**
 *  TODO Please uncomment routes after the release and add fixes
 */
export function Routes() {
  return (
    <Switch>
      {featuresConfig.earlyRelease ? (
        <Route path={['/', EARN_PATH, PolkadotSlotAuctionRoutes.root]} exact>
          <Redirect
            to={PolkadotSlotAuctionRoutes.crowdloans.generatePath(
              isMainnet
                ? EParachainPolkadotNetwork.DOT.toLowerCase()
                : EParachainPolkadotNetwork.WND.toLowerCase(),
            )}
          />
        </Route>
      ) : (
        <Route path={['/', EARN_PATH]} exact>
          <Redirect to={DashboardRoutes.dashboard.generatePath()} />
        </Route>
      )}

      {getBoostRoutes()}
      {!featuresConfig.earlyRelease && getStakeRoutes()}
      {!featuresConfig.earlyRelease && getStakePolygonRoutes()}

      {!featuresConfig.earlyRelease &&
        featuresConfig.stakeFantom &&
        getStakeFantomRoutes()}

      {!featuresConfig.earlyRelease && getDashboardRoutes()}

      {/* TODO: STAKAN-990 remove eth2Swap flag when feature is done */}
      {!featuresConfig.earlyRelease &&
        featuresConfig.eth2Swap &&
        getETH2SwapRoutes()}

      {getPolkadotSlotAuctionRoutes()}

      <Route>
        <DefaultLayout>
          <PageNotFound />
        </DefaultLayout>
      </Route>
    </Switch>
  );
}
