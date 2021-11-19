import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { useStyles } from './ChainItemStyles';
import { ChainItem } from './ChainItem';
import { ChainItemSkeleton } from './ChainItemSkeleton';

interface ChainItemProps {
  chainId: string;
}

export const ChainItemQuery = ({ chainId }: ChainItemProps) => {
  const dispatchRequest = useDispatchRequest();
  const classes = useStyles();

  useOnMount(() => {
    dispatchRequest(fetchChain(chainId));
  });

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

            return <ChainItem data={data} chainId={chainId} />;
          }}
        </Queries>
      </div>
    </ThemeProvider>
  );
};
