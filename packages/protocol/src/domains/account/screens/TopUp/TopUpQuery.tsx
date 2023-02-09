import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { Loader } from 'domains/account/components/Loader';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { TopUp } from './TopUp';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { topUpGetInitialStep } from 'domains/account/actions/topUp/getInitialStep/getInitialStep';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCheckConfirmedEmail, useTopUpBreadcrumbs } from './TopUpUtils';
import { useLazyTopUpResetQuery } from 'domains/account/actions/topUp/reset';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const TopUpQuery = () => {
  const { loading, hasPrivateAccess, isWalletConnected } = useAuth();
  const [getInitialStep, { data = TopUpStep.start, isLoading }] =
    useQueryEndpoint(topUpGetInitialStep);
  const [reset] = useLazyTopUpResetQuery();
  const history = useHistory();

  useCheckConfirmedEmail(hasPrivateAccess, isWalletConnected);

  useEffect(() => {
    if (!isWalletConnected) {
      const link = hasPrivateAccess
        ? AccountRoutesConfig.accountDetails.generatePath()
        : PricingRoutesConfig.pricing.generatePath();

      history.push(link);
    } else if (!loading) {
      getInitialStep();
    }
  }, [loading, isWalletConnected, history, hasPrivateAccess, getInitialStep]);

  useOnUnmount(() => {
    reset();
  });

  useTopUpBreadcrumbs(hasPrivateAccess);

  return isLoading ? (
    <Loader />
  ) : (
    <TopUp initialStep={data} hasPrivateAccess={hasPrivateAccess} />
  );
};