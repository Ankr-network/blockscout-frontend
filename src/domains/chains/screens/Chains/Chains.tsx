import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from './components/ChainsSortSelect';
import { ChainsList } from './components/ChainsList';
import { fetchChains } from '../../actions/fetchChains';

export const Chains = () => {
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchChains());
  }, [dispatchRequest]);

  const { data } = useQuery({
    type: fetchChains.toString(),
    action: fetchChains,
  });

  // eslint-disable-next-line no-console
  console.log('data', data);

  return (
    <>
      <PageHeader
        title={t('chains.title')}
        select={<ChainsSortSelect />}
        button={
          <Button
            variant="text"
            color="primary"
            disableElevation={false}
            disabled
          >
            {t('chains.integrate-button')}
          </Button>
        }
      />
      <ChainsList />
    </>
  );
};
