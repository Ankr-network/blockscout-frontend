import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { resetRequests } from '@redux-requests/core';

import { mainTheme } from 'modules/themes/mainTheme';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { useStyles } from './ChainItemStyles';
import { ChainItemSkeleton } from './ChainItemSkeleton';
import { ChainItemDetailsQuery } from './ChainItemDetailsQuery';

interface ChainItemProps {
  chainId: string;
}

export const ChainItemQuery = ({ chainId }: ChainItemProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useOnMount(() => {
    dispatch(fetchChain(chainId));
  });

  useEffect(() => {
    return () => {
      dispatch(
        resetRequests([
          fetchChain.toString(),
          { requestType: fetchChain.toString(), requestKey: chainId },
        ]),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classes.root}>
        <Queries<ResponseData<typeof fetchChain>>
          requestActions={[fetchChain]}
          requestKeys={[chainId]}
          isPreloadDisabled
        >
          {({ data, loading }) => {
            if (loading || !data) {
              return <ChainItemSkeleton />;
            }

            return <ChainItemDetailsQuery data={data} chainId={chainId} />;
          }}
        </Queries>
      </div>
    </ThemeProvider>
  );
};
