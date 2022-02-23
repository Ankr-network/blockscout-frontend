import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { Timeframe } from 'multirpc-sdk';
import classNames from 'classnames';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { ChainItemDetails } from './components/ChainItemDetails';
import { fetchChainDetails } from 'domains/chains/actions/fetchChainDetails';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChainRequestsChart } from './components/ChainRequestsChart';
import { useStyles } from './ChainItemStyles';
import { IS_REACT_SNAP } from 'uiKit/NoReactSnap';

interface ChainItemProps {
  chainId: string;
}

const TIMEFRAME: Timeframe = '24h';

export const ChainItemDetailsQuery = ({ chainId }: ChainItemProps) => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(fetchChainDetails(chainId, TIMEFRAME));
  });

  return (
    <Queries<ResponseData<typeof fetchChainDetails>>
      requestActions={[fetchChainDetails]}
      requestKeys={[chainId]}
      isPreloadDisabled
    >
      {({ data, loading, pristine }) => {
        const {
          totalCached,
          totalRequests,
          totalRequestsHistory,
          totalCachedHistory,
        } = data || {};

        return (
          <>
            <ChainItemDetails
              className={classes.details}
              totalCached={totalCached}
              totalRequests={totalRequests}
              timeframe={TIMEFRAME}
              loading={IS_REACT_SNAP || (loading && pristine)}
              chainId={chainId}
            />
            <ChainRequestsChart
              totalRequestsHistory={totalRequestsHistory}
              totalCachedHistory={totalCachedHistory}
              className={classNames(classes.chart, chainId)}
              loading={IS_REACT_SNAP || (loading && pristine)}
              chainId={chainId}
            />
          </>
        );
      }}
    </Queries>
  );
};
