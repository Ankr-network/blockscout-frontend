import React, { useState, useCallback, useRef } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { Timeframe } from '@ankr.com/multirpc';

import { mainTheme } from 'modules/themes/mainTheme';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from 'modules/i18n/utils/intl';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainItemDetails } from './components/ChainItemDetails';
import { ChainRequestsOverview } from './components/ChainRequestsOverview';
import { RequestsMap } from './components/RequestsMap';
import { useStyles } from './ChainItemStyles';
import { useIsSMDown } from 'modules/themes/useTheme';

interface ChainItemProps {
  chainId: string;
}

export const ChainItem = ({ chainId }: ChainItemProps) => {
  const classes = useStyles();
  const [timeframe, setTimeframe] = useState<Timeframe>('30d');

  const { credentials } = useAuth();
  const dispatchRequest = useDispatchRequest();
  const { setBreadcrumbs } = useBreadcrumbs();
  const isMobile = useIsSMDown();

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

  useOnMount(() => {
    dispatchRequest(fetchChain(chainId));
  });

  const handleTimeframeClick = useCallback((newTimeframe: Timeframe) => {
    setTimeframe(newTimeframe);
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classes.root}>
        <Queries<ResponseData<typeof fetchChain>>
          requestActions={[fetchChain]}
          requestKeys={[chainId]}
        >
          {({ data: { chain, details } }) => {
            const chainsDetails = details[timeframe];

            const {
              totalCached,
              totalRequests,
              totalRequestsHistory,
              countries,
            } = chainsDetails;

            const totalRequestsCount = {
              '30d': details?.['30d'].totalRequests,
              '7d': details?.['7d'].totalRequests,
              '24h': details?.['24h'].totalRequests,
            };

            handleSetBreadcrumbs(chain.name);

            const detailsBlock = (
              <ChainItemDetails
                className={classes.chainItemDetails}
                totalCached={totalCached}
                totalRequests={totalRequests}
                timeframe={timeframe}
              />
            );

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
                  {isMobile && detailsBlock}
                  <ChainRequestsOverview
                    className={classes.chainRequestsOverview}
                    totalRequests={totalRequestsCount}
                    totalRequestsHistory={totalRequestsHistory}
                    onClick={handleTimeframeClick}
                    timeframe={timeframe}
                  />
                  {Object.keys(countries).length !== 0 && (
                    <RequestsMap countries={countries} />
                  )}
                </div>
                {!isMobile && detailsBlock}
              </>
            );
          }}
        </Queries>
      </div>
    </ThemeProvider>
  );
};
