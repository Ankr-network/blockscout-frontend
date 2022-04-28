import { ChainId } from 'domains/chains/api/chain';
import { Route, Switch } from 'react-router-dom';

import { ChainsRoutes, ChainsRoutesConfig } from './domains/chains/Routes';
import { DefaultLayout } from './modules/layout/components/DefautLayout';
import { PageNotFound } from './modules/router/components/PageNotFound';

export const ANKR_WEBSITE_URL = 'https://www.ankr.com/';
export const PROTOCOL_URL = 'https://www.ankr.com/protocol/public/';
export const PLAN_URL = 'https://www.ankr.com/protocol/plan/';

export function Routes({ chainId }: { chainId?: ChainId }) {
  return (
    <Switch>
      <Route
        exact
        path={[chainId ? '/' : ChainsRoutesConfig.chainDetails.path]}
        render={() => (
          <DefaultLayout withNoReactSnap={false}>
            <ChainsRoutes chainId={chainId} />
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
