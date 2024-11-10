import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardCardPaymentSuccessAuthRoute } from 'domains/auth/components/GuardAuthRoute/GuardCardPaymentSuccessAuthRoute';
import { useAppSelector } from 'store/useAppSelector';
import { selectHasPremium, selectHasPrivateAccess } from 'domains/auth/store';

export const PATH_ACCOUNT = '/account/';
export const PATH_CARDPAYMENT_SUCCESS = `${PATH_ACCOUNT}success/`;
export const PATH_CARDPAYMENT_FAILURE = `${PATH_ACCOUNT}failure/`;

export const ACCOUNT_PATHS = [
  PATH_ACCOUNT,
  PATH_CARDPAYMENT_SUCCESS,
  PATH_CARDPAYMENT_FAILURE,
];

export const AccountRoutesConfig = createRouteConfig(
  {
    accountDetails: {
      path: PATH_ACCOUNT,
      generatePath: () => PATH_ACCOUNT,
      breadcrumbs: 'account.account-details.breadcrumbs',
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
    import('./screens/BillingPage').then(module => module.BillingPage),
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

export const CardPaymentRoutes = () => {
  return (
    <GuardUserGroup blockName={BlockWithPermission.Billing} shouldRedirect>
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
    </GuardUserGroup>
  );
};

export function AccountRoutes() {
  const hasPrivateAccess = useAppSelector(selectHasPrivateAccess);
  const hasPremium = useAppSelector(selectHasPremium);

  return (
    <GuardUserGroup blockName={BlockWithPermission.Billing} shouldRedirect>
      <Route
        exact
        path={AccountRoutesConfig.accountDetails.path}
        component={LoadableAccountDetailsContainer}
      />
      <Route
        exact
        path={AccountRoutesConfig.cardPaymentSuccess.path}
        component={LoadableCardPaymentSuccessContainer}
      />
      <GuardCardPaymentSuccessAuthRoute
        component={LoadableCardPaymentFailureContainer}
        exact
        hasPremium={hasPremium}
        hasPrivateAccess={hasPrivateAccess}
        path={AccountRoutesConfig.cardPaymentSuccess.path}
      />
    </GuardUserGroup>
  );
}
