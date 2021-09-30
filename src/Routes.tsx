import { Route, Switch } from 'react-router-dom';

import { ChainsRoutes, ChainsRoutesConfig } from './modules/chains/Routes';
import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { Themes } from './modules/themes/types';

export function Routes() {
  return (
    <Switch>
      <Route
        exact
        path={[
          ChainsRoutesConfig.Chains.path,
          ChainsRoutesConfig.ChainDetails.path,
        ]}
        render={() => (
          <DefaultLayout headerTheme={Themes.dark} footerTheme={Themes.dark}>
            <ChainsRoutes />
          </DefaultLayout>
        )}
      />
      <Route
        render={() => (
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        )}
      />
    </Switch>
  );
}
