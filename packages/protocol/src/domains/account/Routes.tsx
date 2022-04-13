import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_ACCOUNT = '/account/';
export const PATH_TOPUP = `${PATH_ACCOUNT}topup/`;
export const PATH_WITHDRAW = `${PATH_ACCOUNT}/withdraw`;

export const AccountRoutesConfig = createRouteConfig(
  {
    accountDetails: {
      path: PATH_ACCOUNT,
      generatePath: () => PATH_ACCOUNT,
      breadcrumbs: 'account.account-details.breadcrumbs',
    },
    topUp: {
      path: PATH_TOPUP,
      generatePath: () => PATH_TOPUP,
      breadcrumbs: 'account.top-up.breadcrumbs',
    },
    withdraw: {
      path: PATH_WITHDRAW,
      generatePath: () => PATH_WITHDRAW,
      breadcrumbs: 'account.withdraw.breadcrumbs',
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

const LoadableTopUpContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/TopUp').then(module => module.TopUp),
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
      <Route
        exact
        path={AccountRoutesConfig.topUp.path}
        component={LoadableTopUpContainer}
      />
    </>
  );
}
