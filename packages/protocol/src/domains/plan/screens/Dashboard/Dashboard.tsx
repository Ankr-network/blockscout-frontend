import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { Box, Typography } from '@material-ui/core';

import { PageHeader } from 'modules/common/components/PageHeader';
import { t } from 'modules/i18n/utils/intl';
import { ChainsSortSelect } from 'domains/chains/screens/Chains/components/ChainsSortSelect';
import { RpcList } from './components/RpcsList';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { DashboardRoutesConfig } from 'domains/dashboard/Routes';
import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { useProvider } from 'modules/auth/hooks/useProvider';
import { useStyles } from './DashboardStyles';

const HAS_SORT_SELECT = false;

export const Dashboard = () => {
  const dispatchRequest = useDispatchRequest();
  const { handleFetchProvider } = useProvider();
  const classes = useStyles();

  useSetBreadcrumbs([
    {
      title: t(DashboardRoutesConfig.dashboard.breadcrumbs),
    },
  ]);

  useEffect(() => {
    dispatchRequest(fetchPrivateChains());
    handleFetchProvider();
  }, [dispatchRequest, handleFetchProvider]);

  return (
    <>
      <PageHeader select={HAS_SORT_SELECT ? <ChainsSortSelect /> : null} />
      <Box className={classes.top}>
        <Typography variant="body2" className={classes.text}>
          {t('providers.private-endpoints.user-endpoint')}
        </Typography>
      </Box>
      <Queries<ResponseData<typeof fetchPrivateChains>>
        requestActions={[fetchPrivateChains]}
      >
        {({ data }) => <RpcList data={data} />}
      </Queries>
    </>
  );
};
