import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_ACCOUNT = '/account/';

export const AccountRoutesConfig = createRouteConfig<any>(
  {
    accountDetails: {
      path: PATH_ACCOUNT,
      generatePath: () => PATH_ACCOUNT,
      breadcrumbs: 'account.accountDetails.breadcrumbs',
    },
  },
  PATH_ACCOUNT,
);

const LoadableAccountDetailsContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/AccountDetails').then(module => module.AccountDetails),
  {
    fallback: <Spinner />,
  },
);

export function AccountRoutes() {
  return (
    <>
      <Route
        exact
        path={AccountRoutesConfig.accountDetails.path}
        component={LoadableAccountDetailsContainer}
      />
    </>
  );
}
