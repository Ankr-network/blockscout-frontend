import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { PageHeader } from 'modules/common/components/PageHeader';
import { CreateRpcButton } from 'modules/common/components/CreateRpcButton';
import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from 'domains/chains/screens/Chains/components/ChainsSortSelect';
import { RpcList } from './components/RpcsList';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchPrivateChains } from '../../../chains/actions/fetchPrivateChains';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { DashboardRoutesConfig } from 'domains/dashboard/Routes';

const HAS_SORT_SELECT = false;

export const Dashboard = () => {
  const dispatchRequest = useDispatchRequest();

  useSetBreadcrumbs([
    {
      title: t(DashboardRoutesConfig.dashboard.breadcrumbs),
    },
  ]);

  useEffect(() => {
    dispatchRequest(fetchPrivateChains());
  }, [dispatchRequest]);

  return (
    <>
      <PageHeader
        title={t('dashboard.title')}
        select={HAS_SORT_SELECT ? <ChainsSortSelect /> : null}
        button={<CreateRpcButton />}
      />
      <Queries<ResponseData<typeof fetchPrivateChains>>
        requestActions={[fetchPrivateChains]}
      >
        {({ data }) => <RpcList data={data} />}
      </Queries>
    </>
  );
};
