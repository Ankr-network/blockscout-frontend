import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Loader } from 'domains/account/components/Loader';
import { TopUp } from './TopUp';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { topUpGetInitialStep } from 'domains/account/actions/topUp/getInitialStep/getInitialStep';
import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  useCheckConfirmedEmail,
  useTopUpBreadcrumbs,
  useTopUpOriginRoute,
} from './TopUpUtils';
import { useLazyTopUpResetQuery } from 'domains/account/actions/topUp/reset';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const TopUpQuery = () => {
  const { loading, hasPrivateAccess, isLoggedIn, isWalletConnected } =
    useAuth();
  const [getInitialStep, { data = TopUpStep.start, isLoading }] =
    useQueryEndpoint(topUpGetInitialStep);
  const [reset] = useLazyTopUpResetQuery();
  const history = useHistory();
  const routesConfig = useTopUpOriginRoute(isLoggedIn);

  useCheckConfirmedEmail(hasPrivateAccess, isWalletConnected);

  useEffect(() => {
    if (!isWalletConnected) {
      const link = routesConfig.generatePath();

      history.push(link);
    } else if (!loading) {
      getInitialStep();
    }
  }, [loading, isWalletConnected, history, routesConfig, getInitialStep]);

  useOnUnmount(() => {
    reset();
  });

  useTopUpBreadcrumbs(routesConfig);

  return isLoading ? (
    <Loader />
  ) : (
    <TopUp initialStep={data} hasPrivateAccess={hasPrivateAccess} />
  );
};
