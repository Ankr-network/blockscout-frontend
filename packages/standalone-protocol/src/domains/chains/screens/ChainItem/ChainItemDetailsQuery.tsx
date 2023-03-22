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
import { ChainId } from 'domains/chains/api/chain';
import { Info } from './components/Info';
import { useHasAnkrsInfo } from './ChainItemUtils';
import { useSpinner } from 'modules/layout/components/AppBase/AppBaseUtils';

interface ChainItemProps {
  isComingSoon: boolean;
  chainId: ChainId;
  isStandalone: boolean;
}

const TIMEFRAME: Timeframe = '24h';

export const ChainItemDetailsQuery = ({
  isComingSoon,
  chainId,
  isStandalone,
}: ChainItemProps) => {
  const classes = useStyles();
  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(fetchChainDetails(chainId, TIMEFRAME, isStandalone));
  });

  const hasInfo = useHasAnkrsInfo(chainId);
  const spinner = useSpinner(chainId);

  return (
    <Queries<ResponseData<typeof fetchChainDetails>>
      requestActions={[fetchChainDetails]}
      requestKeys={[chainId]}
      isPreloadDisabled
      spinner={spinner}
    >
      {({ data, loading }) => {
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
              isComingSoon={isComingSoon}
              totalCached={totalCached}
              totalRequests={totalRequests}
              timeframe={TIMEFRAME}
              loading={IS_REACT_SNAP || (loading && !data)}
              chainId={chainId}
            />
            {hasInfo && <Info />}
            {!isComingSoon && (
              <ChainRequestsChart
                totalRequestsHistory={totalRequestsHistory}
                totalCachedHistory={totalCachedHistory}
                className={classNames(classes.chart, chainId)}
                loading={IS_REACT_SNAP || (loading && !data)}
                chainId={chainId}
              />
            )}
          </>
        );
      }}
    </Queries>
  );
};
