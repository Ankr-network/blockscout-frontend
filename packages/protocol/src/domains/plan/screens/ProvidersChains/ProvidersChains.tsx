import React from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';
import { ProvidersChainsQuery } from './ProvidersChainsQuery';
import { BackButton } from '../AddEndpoint/components/BackButton';
import { useStyles } from './ProvidersChainsStyles';
import { fetchEndpoints } from 'domains/nodeProviders/actions/fetchEndpoints';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const ProvidersChains = () => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();

  useSetBreadcrumbs([
    {
      title: t(ProvidersRoutesConfig.providers.breadcrumbs),
    },
  ]);

  useOnMount(() => {
    dispatchRequest(fetchEndpoints());
  });

  const { data } = useQuery({
    type: fetchEndpoints.toString(),
  });

  return (
    <>
      {data && data.length > 0 && (
        <BackButton
          title={t('providers.chains.title')}
          className={classes.button}
        />
      )}
      <ProvidersChainsQuery />
    </>
  );
};
