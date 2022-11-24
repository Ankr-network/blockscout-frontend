import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { useHistory } from 'react-router';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { getInitialStep } from 'domains/account/actions/topUp/getInitialStep/getInitialStep';
import { reset } from 'domains/account/actions/topUp/reset';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { Loader } from 'domains/account/components/Loader';
import { TopUp } from './TopUp';
import { useCheckConfirmedEmail, useTopUpBreadcrumbs } from './TopUpUtils';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { PricingRoutesConfig } from 'domains/pricing/Routes';

export const TopUpQuery = () => {
  const { loading, credentials, isWalletConnected, workerTokenData } =
    useAuth();
  const dispatchRequest = useDispatchRequest();
  const history = useHistory();

  useCheckConfirmedEmail(Boolean(credentials), isWalletConnected);

  useEffect(() => {
    if (!isWalletConnected) {
      const link = credentials
        ? AccountRoutesConfig.accountDetails.generatePath()
        : PricingRoutesConfig.pricing.generatePath();

      history.push(link);
    } else if (!loading) {
      dispatchRequest(getInitialStep());
    }
  }, [loading, dispatchRequest, isWalletConnected, history, credentials]);

  useOnUnmount(() => {
    dispatchRequest(reset());
  });

  useTopUpBreadcrumbs(Boolean(credentials));

  return (
    <Queries<ResponseData<typeof getInitialStep>>
      requestActions={[getInitialStep]}
      showLoaderDuringRefetch={false}
      spinner={<Loader />}
    >
      {({ data }) => (
        <TopUp
          initialStep={data}
          hasCredentials={Boolean(
            credentials && workerTokenData?.userEndpointToken,
          )}
        />
      )}
    </Queries>
  );
};
