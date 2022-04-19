import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { stopPolling, resetRequests } from '@redux-requests/core';

import { mainTheme } from 'ui';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { useStyles } from './ChainItemStyles';
import { ChainItemSkeleton } from './ChainItemSkeleton';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
// eslint-disable-next-line import/no-cycle
import { ChainItem } from './ChainItem';
import { fetchPrivateChainDetails } from 'domains/chains/actions/fetchPrivateChainDetails';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { useProvider } from 'modules/auth/hooks/useProvider';
import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { fetchEndpoints } from 'domains/nodeProviders/actions/fetchEndpoints';
import { IApiChain } from 'domains/chains/api/queryChains';

interface ChainItemProps {
  chainId: string;
}

export const ChainItemQuery = ({ chainId }: ChainItemProps) => {
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  const { credentials } = useAuth();
  const { handleFetchProvider, providerData } = useProvider();
  const classes = useStyles();

  const { data: privateChains } = useQuery<IApiChain[]>({
    type: fetchPrivateChains.toString(),
  });

  useOnMount(() => {
    dispatchRequest(fetchChain(chainId));
  });

  useEffect(() => {
    if (credentials) {
      dispatchRequest(fetchPrivateChains());
      handleFetchProvider();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  useEffect(() => {
    if (credentials && privateChains) {
      dispatchRequest(fetchPrivateChainDetails(chainId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateChains, credentials]);

  useEffect(() => {
    if (providerData) {
      dispatchRequest(fetchEndpoints());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerData]);

  useOnUnmount(() => {
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
  });

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

            return <ChainItem data={data} chainId={chainId} />;
          }}
        </Queries>
      </div>
    </ThemeProvider>
  );
};
