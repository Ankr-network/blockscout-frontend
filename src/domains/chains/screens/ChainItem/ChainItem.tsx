import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainItemDetails } from './components/ChainItemDetails';
import { ChainRequestsOverview } from './components/ChainRequestsOverview';
import { useStyles } from './ChainItemStyles';

export const ChainItem = () => {
  const classes = useStyles();
  const { credentials } = useAuth();

  const dispatchRequest = useDispatchRequest();
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  useEffect(() => {
    dispatchRequest(fetchChain(chainId));
  }, [dispatchRequest, chainId]);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classes.root}>
        <Queries<ResponseData<typeof fetchChain>> requestActions={[fetchChain]}>
          {({ data: { chain, chainDetails } }) => {
            const {
              dataCached,
              totalCached,
              totalServed,
              uniqueVisitors,
              totalRequests,
              totalRequestsHistory,
            } = chainDetails;

            return (
              <>
                <div>
                  <ChainItemHeader
                    chain={chain}
                    chainId={chainId}
                    hasCredentials={Boolean(credentials)}
                  />
                  <ChainRequestsOverview
                    className={classes.overview}
                    totalRequests={totalRequests}
                    totalRequestsHistory={totalRequestsHistory}
                  />
                </div>
                <ChainItemDetails
                  dataCached={dataCached}
                  totalCached={totalCached}
                  totalServed={totalServed}
                  uniqueVisitors={uniqueVisitors}
                />
              </>
            );
          }}
        </Queries>
      </div>
    </ThemeProvider>
  );
};
