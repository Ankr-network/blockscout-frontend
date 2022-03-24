import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';

import { PageHeader } from 'modules/common/components/PageHeader';

import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from './components/ChainsSortSelect';
import { ChainsList } from './components/ChainsList';
import { ChainListSpinner } from './components/ChainsList/ChainListSpinner';
import { ChainBlock } from './components/ChainBlock';
import { fetchPublicChainsInfo } from 'domains/chains/actions/fetchPublicChainsInfo';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { useChainsStyles } from './ChainsStyles';

const HAS_SORT_SELECT = false;
const ENABLE_HOW_TO_INTEGRATE = false;

const SHOW_UNIQUE_USERS_SERVED = false;
const SHOW_TOTAL_ASSET_VALUE_TRANSFERRED = false;

export const Chains = () => {
  const classes = useChainsStyles();

  const dispatchRequest = useDispatchRequest();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  useEffect(() => {
    dispatchRequest(fetchPublicChainsInfo());
  }, [dispatchRequest]);

  const [loading, setLoading] = useState<boolean>(true);
  const [totalRequestsData, setTotalRequestData] = useState<string>('');

  const handleChainInfo = (totalRequest: string, loadingStatus: boolean) => {
    setTotalRequestData(totalRequest);
    setLoading(loadingStatus);
  };

  return (
    <>
      <Typography variant="h5" noWrap className={classes.title}>
        {t('30-days-statistics.title')}
      </Typography>
      <div className={classes.blockList}>
        <ChainBlock
          isLoading={loading}
          subtitle={t('30-days-statistics.total-requests-made')}
          value={totalRequestsData}
        />
        {SHOW_UNIQUE_USERS_SERVED && (
          <ChainBlock
            isLoading={loading}
            subtitle={t('30-days-statistics.unique-users-served')}
            value="41,462,731"
          />
        )}
        {SHOW_TOTAL_ASSET_VALUE_TRANSFERRED && (
          <ChainBlock
            isLoading={loading}
            subtitle={t('30-days-statistics.total-asset-value-transferred')}
            value="$135,564,991,200"
          />
        )}
      </div>
      <PageHeader
        title={t('chains.title')}
        select={HAS_SORT_SELECT ? <ChainsSortSelect /> : null}
        button={
          ENABLE_HOW_TO_INTEGRATE && (
            <Button variant="text" color="primary" disabled>
              {t('chains.integrate-button')}
            </Button>
          )
        }
      />
      <Queries<ResponseData<typeof fetchPublicChainsInfo>>
        spinner={<ChainListSpinner />}
        requestActions={[fetchPublicChainsInfo]}
      >
        {({ data }) => (
          <ChainsList
            outLoading={loading}
            data={data}
            handleChainInfo={handleChainInfo}
          />
        )}
      </Queries>
    </>
  );
};
