import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Loader } from 'domains/account/components/Loader';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { topUpGetInitialStep } from 'domains/account/actions/topUp/getInitialStep/getInitialStep';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyTopUpResetQuery } from 'domains/account/actions/topUp/reset';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import {
  useCheckConfirmedEmail,
  useTopUpBreadcrumbs,
  useTopUpOriginRoute,
} from './TopUpUtils';
import { TopUp } from './TopUp';

export const TopUpQuery = () => {
  const { hasPrivateAccess, isLoggedIn, isWalletConnected } = useAuth();
  const [
    getInitialStep,
    {
      data: initialStep = TopUpStep.start,
      isLoading: isInitialStepLoading,
      isUninitialized: isInitialStepUninitialized,
    },
  ] = useQueryEndpoint(topUpGetInitialStep);
  const [reset] = useLazyTopUpResetQuery();
  const history = useHistory();
  const routesConfig = useTopUpOriginRoute(isLoggedIn);

  useCheckConfirmedEmail(hasPrivateAccess, isWalletConnected);
  useTopUpBreadcrumbs(routesConfig);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const redirect = useCallback(() => {
    const link = routesConfig.generatePath();

    history.push(link);
  }, [history, routesConfig]);

  useEffect(() => {
    if (isWalletConnected) {
      getInitialStep({ group });
    } else {
      redirect();
    }
  }, [isWalletConnected, redirect, getInitialStep, group]);

  useOnUnmount(() => {
    reset();
  });

  if (
    isInitialStepLoading ||
    isInitialStepUninitialized ||
    initialStep === null
  ) {
    return <Loader />;
  }

  return (
    <TopUp initialStep={initialStep} hasPrivateAccess={hasPrivateAccess} />
  );
};
