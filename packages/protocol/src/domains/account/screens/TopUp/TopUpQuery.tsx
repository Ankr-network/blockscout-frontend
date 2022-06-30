import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { getInitialStep } from 'domains/account/actions/topUp/getInitialStep/getInitialStep';
import { TopUp } from './TopUp';
import { useTopUpBreadcrumbs } from './TopUpUtils';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { reset } from 'domains/account/actions/topUp/reset';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const TopUpQuery = () => {
  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(getInitialStep());
  });

  useOnUnmount(() => {
    dispatchRequest(reset());
  });

  useTopUpBreadcrumbs();

  const { credentials } = useAuth();

  return (
    <Queries<ResponseData<typeof getInitialStep>>
      requestActions={[getInitialStep]}
      showLoaderDuringRefetch={false}
    >
      {({ data }) => (
        <TopUp initialStep={data} hasCredentials={Boolean(credentials)} />
      )}
    </Queries>
  );
};
