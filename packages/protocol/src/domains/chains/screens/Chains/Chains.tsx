import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { PageHeader } from 'modules/common/components/PageHeader';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';

import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from './components/ChainsSortSelect';
import { ChainsList } from './components/ChainsList';
import { fetchPublicChains } from '../../actions/fetchPublicChains';
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
    dispatchRequest(fetchPublicChains());
  }, [dispatchRequest]);

  const [totalRequestsData, setTotalRequestsData] = useState('');
  const [loading, setLoading] = useState(true);

  const setTotalData = (totalRequest: string) => {
    setTotalRequestsData(totalRequest);
    setLoading(false);
  };

  return (
    <>
      {!loading && (
        <>
          <Typography variant="h5" noWrap className={classes.title}>
            {t('30-days-statistics.title')}
          </Typography>
          <div className={classes.blockList}>
            <div className={classes.block}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                {t('30-days-statistics.total-requests-made')}
              </Typography>
              <Typography variant="h4" className={classes.text}>
                {totalRequestsData}
              </Typography>
            </div>
            {SHOW_UNIQUE_USERS_SERVED && (
              <div className={classes.block}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  {t('30-days-statistics.unique-users-served')}
                </Typography>
                <Typography variant="h4" className={classes.text}>
                  41,462,731
                </Typography>
              </div>
            )}
            {SHOW_TOTAL_ASSET_VALUE_TRANSFERRED && (
              <div className={classes.block}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  {t('30-days-statistics.total-asset-value-transferred')}
                </Typography>
                <Typography variant="h4" className={classes.text}>
                  $135,564,991,200
                </Typography>
              </div>
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
        </>
      )}
      <Queries<ResponseData<typeof fetchPublicChains>>
        requestActions={[fetchPublicChains]}
      >
        {({ data }) => (
          <ChainsList data={data} setTotalRequestsData={setTotalData} />
        )}
      </Queries>
    </>
  );
};
