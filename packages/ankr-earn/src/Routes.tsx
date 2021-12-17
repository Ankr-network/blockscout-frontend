import { getRoutes as getBoostRoutes } from 'modules/boost/Routes';
import { getRoutes as getStakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { EMPTY_PATH, INDEX_PATH } from 'modules/common/const';
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

      {getBoostRoutes()}
      {getStakePolygonRoutes()}
    </Switch>
  );
}
