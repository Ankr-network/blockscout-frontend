import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { getWithdrawInitialStep } from 'domains/account/actions/withdraw/getWithdrawInitialStep';
import { Withdraw } from './Withdraw';
import { useWithdrawBreadcrumbs } from './WithdrawUtils';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { reset } from 'domains/account/actions/withdraw/reset';

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
    >
      {({ data }) => <Withdraw initialStep={data} />}
    </Queries>
  );
};
