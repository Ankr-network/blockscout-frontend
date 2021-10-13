import React from 'react';

import { PageHeader } from 'modules/common/components/PageHeader';
import { CreateRpcButton } from 'modules/common/components/CreateRpcButton';
import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from 'domains/chains/screens/Chains/components/ChainsSortSelect';
import { RpcsList } from './components/RpcsList';

export const Dashboard = () => {
  return (
    <>
      <PageHeader
        title={t('dashboard.title')}
        select={<ChainsSortSelect />}
        button={<CreateRpcButton />}
      />
      <RpcsList />
    </>
  );
};
