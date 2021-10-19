import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { Button } from '@material-ui/core';

import { PageHeader } from 'modules/common/components/PageHeader';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchNodeProviders } from 'domains/nodeProviders/actions/fetchNodeProviders';
import { t } from 'modules/i18n/utils/intl';
import { ProvidersTable } from './components/ProvidersTable';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';

export const ProvidersList = () => {
  const dispatchRequest = useDispatchRequest();

  useSetBreadcrumbs([
    {
      title: t(ProvidersRoutesConfig.providers.breadcrumbs),
    },
  ]);

  useEffect(() => {
    dispatchRequest(fetchNodeProviders());
  }, [dispatchRequest]);

  return (
    <>
      <PageHeader
        title={t('providers.title')}
        button={
          <Button variant="text" color="primary" disabled>
            {t('providers.integrate-button')}
          </Button>
        }
      />
      <Queries<ResponseData<typeof fetchNodeProviders>>
        requestActions={[fetchNodeProviders]}
      >
        {({ data }) => <ProvidersTable data={data} />}
      </Queries>
    </>
  );
};
