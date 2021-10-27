import React, { useEffect, useCallback, useRef } from 'react';
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
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from 'modules/i18n/utils/intl';

interface ChainItemProps {
  chainId: string;
}

export const ChainItem = ({ chainId }: ChainItemProps) => {
  const classes = useStyles();
  const { credentials } = useAuth();
  const dispatchRequest = useDispatchRequest();
  const { setBreadcrumbs } = useBreadcrumbs();

  const hasBreadcrumbsRef = useRef<boolean>(false);

  const handleSetBreadcrumbs = useCallback(
    (title: string) => {
      if (hasBreadcrumbsRef.current) return;

      hasBreadcrumbsRef.current = true;

      setBreadcrumbs([
        {
          title: t(ChainsRoutesConfig.chains.breadcrumbs),
          link: ChainsRoutesConfig.chains.path,
        },
        {
          title,
        },
      ]);
    },
    [setBreadcrumbs],
  );

  useEffect(() => {
    dispatchRequest(fetchChain(chainId));
  }, [dispatchRequest, chainId]);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classes.root}>
        <Queries<ResponseData<typeof fetchChain>>
          requestActions={[fetchChain]}
          requestKeys={[chainId]}
        >
          {({ data: { chain, chainDetails } }) => {
            const {
              dataCached,
              totalCached,
              totalServed,
              uniqueVisitors,
              totalRequests,
              totalRequestsHistory,
            } = chainDetails;

            handleSetBreadcrumbs(chain.name);

            return (
              <>
                <div className={classes.chainDetailsWrapper}>
                  <ChainItemHeader
                    className={classes.chainItemHeader}
                    chain={chain}
                    chainId={chainId}
                    hasCredentials={Boolean(credentials)}
                    icon={chain.icon}
                  />
                  <ChainRequestsOverview
                    className={classes.chainRequestsOverview}
                    totalRequests={totalRequests}
                    totalRequestsHistory={totalRequestsHistory}
                  />
                </div>
                <ChainItemDetails
                  className={classes.chainItemDetails}
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
