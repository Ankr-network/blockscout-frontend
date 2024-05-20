import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { t } from '@ankr.com/common';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { BaseRoute } from 'modules/router/utils/createRouteConfig';
import { TopUpOrigin } from 'domains/account/types';
import { selectTopUpOrigin } from 'domains/account/store/selectors';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { topUpOriginRoutesMap } from '../CardPaymentSuccess/utils/getOriginRoute';

export const useTopUpOriginRoute = (isLoggedIn: boolean) => {
  const topUpOrigin = useSelector(selectTopUpOrigin);
  const defaultTopUpOrigin = isLoggedIn
    ? TopUpOrigin.BILLING
    : TopUpOrigin.PRICING;

  return topUpOriginRoutesMap[topUpOrigin ?? defaultTopUpOrigin];
};

export const useTopUpBreadcrumbs = (route: BaseRoute) => {
  const { isLoggedIn } = useAuth();

  const breadcrumbs = [
    {
      title: t(route.breadcrumbs!),
      link: route.generatePath({ isLoggedIn }),
    },
  ];

  useSetBreadcrumbs(breadcrumbs);
};

export const useCheckConfirmedEmail = (
  hasPrivateAccess: boolean,
  isWalletConnected: boolean,
) => {
  const dispatch = useDispatch();

  const {
    confirmedEmail,
    isLoading: emailDataLoading,
    pristine,
  } = useEmailData();

  useEffect(() => {
    if (hasPrivateAccess || !isWalletConnected) return;

    if (!pristine && !emailDataLoading && !confirmedEmail) {
      dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
    }
  }, [
    confirmedEmail,
    emailDataLoading,
    pristine,
    dispatch,
    hasPrivateAccess,
    isWalletConnected,
  ]);
};
