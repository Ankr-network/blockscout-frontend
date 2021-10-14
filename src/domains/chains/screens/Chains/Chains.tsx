import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { PageHeader } from 'modules/common/components/PageHeader';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';

import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from './components/ChainsSortSelect';
import { ChainsList } from './components/ChainsList';
import { fetchChains } from '../../actions/fetchChains';

export const Chains = () => {
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchChains());
  }, [dispatchRequest]);

  return (
    <>
      <PageHeader
        title={t('chains.title')}
        select={<ChainsSortSelect />}
        button={
          <Button variant="text" color="primary" disabled>
            {t('chains.integrate-button')}
          </Button>
        }
      />
      <Queries<ResponseData<typeof fetchChains>> requestActions={[fetchChains]}>
        {({ data }) => <ChainsList data={data} />}
      </Queries>
    </>
  );
};
