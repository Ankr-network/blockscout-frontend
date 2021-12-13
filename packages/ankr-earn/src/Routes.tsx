import { EMPTY_PATH, featuresConfig, INDEX_PATH } from 'modules/common/const';
import { getRoutes as getTradingCockpitRoutes } from 'modules/trading-cockpit/Routes';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DefaultLayout } from './modules/layout/components/DefautLayout';

export function Routes() {
  return (
    <Switch>
      <Route path={INDEX_PATH}>
        <DefaultLayout></DefaultLayout>
      </Route>

      <Route path={EMPTY_PATH} exact>
        <Redirect to={INDEX_PATH} />
      </Route>

      {featuresConfig.tradingCockpit && getTradingCockpitRoutes()}
    </Switch>
  );
}
