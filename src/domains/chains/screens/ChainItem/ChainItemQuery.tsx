import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { stopPolling, resetRequests } from '@redux-requests/core';

import { mainTheme } from 'modules/themes/mainTheme';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { useStyles } from './ChainItemStyles';
import { ChainItemSkeleton } from './ChainItemSkeleton';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
import { ChainItem } from './ChainItem';

interface ChainItemProps {
  chainId: string;
}

export const ChainItemQuery = ({ chainId }: ChainItemProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useOnMount(() => {
    dispatch(fetchChain(chainId));
  });

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
