import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { getWithdrawInitialStep } from 'domains/account/actions/withdraw/getWithdrawInitialStep';
import { reset } from 'domains/account/actions/withdraw/reset';
import { Loader } from 'domains/account/components/Loader';
import { useWithdrawBreadcrumbs } from './WithdrawUtils';
import { Withdraw } from './Withdraw';

export const WithdrawQuery = () => {
  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(getWithdrawInitialStep());
  });

  useOnUnmount(() => {
    dispatchRequest(reset());
  });

  useWithdrawBreadcrumbs();

  return (
    <Queries<ResponseData<typeof getWithdrawInitialStep>>
      requestActions={[getWithdrawInitialStep]}
      showLoaderDuringRefetch={false}
      spinner={<Loader />}
    >
      {({ data }) => <Withdraw initialStep={data} />}
    </Queries>
  );
};
