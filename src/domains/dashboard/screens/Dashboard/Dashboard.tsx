import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { PageHeader } from 'modules/common/components/PageHeader';
import { CreateRpcButton } from 'modules/common/components/CreateRpcButton';
import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from 'domains/chains/screens/Chains/components/ChainsSortSelect';
import { RpcsList } from './components/RpcsList';
import { fetchChains } from 'domains/dashboard/actions/fetchChains';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';

export const Dashboard = () => {
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchChains());
  }, [dispatchRequest]);

  return (
    <>
      <PageHeader
        title={t('dashboard.title')}
        select={<ChainsSortSelect />}
        button={<CreateRpcButton />}
      />
      <Queries<ResponseData<typeof fetchChains>> requestActions={[fetchChains]}>
        {({ data }) => <RpcsList data={data} />}
      </Queries>
    </>
  );
};
