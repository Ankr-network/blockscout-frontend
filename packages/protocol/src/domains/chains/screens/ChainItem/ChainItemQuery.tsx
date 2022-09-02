import { ThemeProvider } from '@material-ui/core';
import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mainTheme } from 'ui';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { fetchPremiumChainFeatures } from 'domains/chains/actions/fetchPremiumChainFeatures';
import { fetchEndpoints } from 'domains/infrastructure/actions/fetchEndpoints';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
// eslint-disable-next-line import/no-cycle
import { ChainItem } from './ChainItem';
import { ChainItemSkeleton } from './ChainItemSkeleton';
import { useStyles } from './ChainItemStyles';

interface ChainItemProps {
  chainId: string;
}

export const ChainItemQuery = ({ chainId }: ChainItemProps) => {
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  const { credentials, loading: walletLoading } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    if (credentials) {
      dispatchRequest(fetchPremiumChainFeatures(chainId));
      dispatchRequest(fetchEndpoints());
    }

    if (!walletLoading) {
      dispatchRequest(fetchChain(chainId, credentials));
    }

    return () => {
      if (!walletLoading) {
        const fetchChainAction = fetchChain.toString();

        dispatch(
          resetRequests([
            fetchChainAction,
            { requestType: fetchChainAction, requestKey: chainId },
          ]),
        );

        dispatch(
          stopPolling([{ requestType: fetchChainAction, requestKey: chainId }]),
        );
      }
    };
  }, [chainId, credentials, dispatch, dispatchRequest, walletLoading]);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classes.root}>
        <Queries<ResponseData<typeof fetchChain>>
          requestActions={[fetchChain]}
          requestKeys={[chainId]}
          isPreloadDisabled
        >
          {({ data, loading, pristine }) => {
            if ((loading && pristine) || !data) {
              return <ChainItemSkeleton />;
            }

            return <ChainItem data={data} />;
          }}
        </Queries>
      </div>
    </ThemeProvider>
  );
};
