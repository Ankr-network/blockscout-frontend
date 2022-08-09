import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { getInitialStep } from 'domains/account/actions/topUp/getInitialStep/getInitialStep';
import { reset } from 'domains/account/actions/topUp/reset';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { Loader } from 'domains/account/components/Loader';
import { TopUp } from './TopUp';
import { useTopUpBreadcrumbs } from './TopUpUtils';

export const TopUpQuery = () => {
  const { loading } = useAuth();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    if (!loading) {
      dispatchRequest(getInitialStep());
    }
  }, [loading, dispatchRequest]);

  useOnUnmount(() => {
    dispatchRequest(reset());
  });

  useTopUpBreadcrumbs();

  const { credentials } = useAuth();

  return (
    <Queries<ResponseData<typeof getInitialStep>>
      requestActions={[getInitialStep]}
      showLoaderDuringRefetch={false}
      spinner={<Loader />}
    >
      {({ data }) => (
        <TopUp initialStep={data} hasCredentials={Boolean(credentials)} />
      )}
    </Queries>
  );
};
