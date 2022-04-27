import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { getTopUpInitialStep } from 'domains/account/actions/topUp/getTopUpInitialStep';
import { TopUp } from './TopUp';
import { useTopUpBreadcrumbs } from './TopUpUtils';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { reset } from 'domains/account/actions/topUp/reset';

export const TopUpQuery = () => {
  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(getTopUpInitialStep());
  });

  useOnUnmount(() => {
    dispatchRequest(reset());
  });

  useTopUpBreadcrumbs();

  return (
    <Queries<ResponseData<typeof getTopUpInitialStep>>
      requestActions={[getTopUpInitialStep]}
      showLoaderDuringRefetch={false}
    >
      {({ data }) => <TopUp initialStep={data} />}
    </Queries>
  );
};
