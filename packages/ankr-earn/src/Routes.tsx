import { EMPTY_PATH, featuresConfig, INDEX_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { getRoutes as getPolkadotSlotAuctionRoutes } from 'modules/polkadot-slot-auction/Routes';
import { getRoutes as getTradingCockpitRoutes } from 'modules/trading-cockpit/Routes';
import { Redirect, Route, Switch } from 'react-router-dom';

export function Routes() {
  return (
    <Switch>
      <Route path={INDEX_PATH}>
        <DefaultLayout />
      </Route>

      <Route path={EMPTY_PATH} exact>
        <Redirect to={INDEX_PATH} />
      </Route>

      {getPolkadotSlotAuctionRoutes()}

      {featuresConfig.tradingCockpit && getTradingCockpitRoutes()}
    </Switch>
  );
}
