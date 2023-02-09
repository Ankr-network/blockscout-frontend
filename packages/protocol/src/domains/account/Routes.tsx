import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { OverlaySpinner } from '@ankr.com/ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_ACCOUNT = '/account/';
export const PATH_TOPUP = `${PATH_ACCOUNT}topup/`;
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
    fallback: <OverlaySpinner />,
  },
);

const LoadableTopUpContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/TopUp').then(module => module.TopUp),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableCardPaymentSuccessContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/CardPaymentSuccess').then(
      module => module.CardPaymentSuccess,
    ),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableCardPaymentFailureContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/CardPaymentFailure').then(
      module => module.CardPaymentFailure,
    ),
  {
    fallback: <OverlaySpinner />,
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
