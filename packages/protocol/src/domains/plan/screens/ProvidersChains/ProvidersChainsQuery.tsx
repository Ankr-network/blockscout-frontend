import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { ChainsList } from './components/ChainsList';
import { fetchAvailableChains } from 'domains/nodeProviders/actions/fetchAvailableChains';
import { BackButton } from '../AddEndpoint/components/BackButton';
import { useStyles } from './ProvidersChainsStyles';
import { t } from 'modules/i18n/utils/intl';

export const ProvidersChainsQuery = () => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchAvailableChains());
  }, [dispatchRequest]);

  return (
    <>
      <BackButton
        title={t('providers.chains.title')}
        className={classes.button}
      />
      <Queries<ResponseData<typeof fetchAvailableChains>>
        requestActions={[fetchAvailableChains]}
      >
        {({ data }) => <ChainsList data={data} />}
      </Queries>
    </>
  );
};
