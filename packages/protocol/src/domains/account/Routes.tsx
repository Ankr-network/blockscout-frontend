import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_ACCOUNT = '/account/';
export const PATH_TOPUP = `${PATH_ACCOUNT}topup/`;
export const PATH_WITHDRAW = `${PATH_ACCOUNT}withdraw/`;
export const PATH_CARDPAYMENT_SUCCESS = `${PATH_ACCOUNT}success/`;
export const PATH_CARDPAYMENT_FAILURE = `${PATH_ACCOUNT}failure/`;

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
    cardPaymentSuccess: {
      path: PATH_CARDPAYMENT_SUCCESS,
      generate: () => PATH_CARDPAYMENT_SUCCESS,
      breadcrumbs: 'account.card-payment-success.breadcrumbs',
    },
    cardPaymentFailure: {
      path: PATH_CARDPAYMENT_FAILURE,
      generage: () => PATH_CARDPAYMENT_FAILURE,
      breadcrumbs: 'account.card-payment-failure.breadcrumbs',
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

const LoadableWithdrawContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Withdraw').then(module => module.Withdraw),
  {
    fallback: <Spinner />,
  },
);

const LoadableCardPaymentSuccessContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/CardPaymentSuccess').then(
      module => module.CardPaymentSuccess,
    ),
  {
    fallback: <Spinner />,
  },
);

const LoadableCardPaymentFailureContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/CardPaymentFailure').then(
      module => module.CardPaymentFailure,
    ),
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
      <Route
        exact
        path={AccountRoutesConfig.withdraw.path}
        component={LoadableWithdrawContainer}
      />
      <Route
        exact
        path={AccountRoutesConfig.cardPaymentSuccess.path}
        component={LoadableCardPaymentSuccessContainer}
      />
      <Route
        exact
        path={AccountRoutesConfig.cardPaymentFailure.path}
        component={LoadableCardPaymentFailureContainer}
      />
    </>
  );
}
