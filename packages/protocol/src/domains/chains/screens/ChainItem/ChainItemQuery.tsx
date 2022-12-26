import { ThemeProvider } from '@material-ui/core';
import { mainTheme } from 'ui';
import { useEffect } from 'react';

import { ChainItem } from './ChainItem';
import { ChainItemSkeleton } from './ChainItemSkeleton';
import {
  IChainItemDetails,
  chainsFetchChain,
} from 'domains/chains/actions/fetchChain';
import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyChainsFetchPremiumChainFeaturesQuery } from 'domains/chains/actions/fetchPremiumChainFeatures';
import { useStyles } from './ChainItemStyles';

interface ChainItemProps {
  chainId: string;
}

const options: Options = {
  subscriptionOptions: { pollingInterval: 30_000 },
};

export const ChainItemQuery = ({ chainId }: ChainItemProps) => {
  const [fetchPremiumChainFeatures] =
    useLazyChainsFetchPremiumChainFeaturesQuery();
  const [fetchChain, fetchChainState, reset] = useQueryEndpoint(
    chainsFetchChain,
    options,
  );

  const {
    hasPrivateAccess,
    loading: walletLoading,
    workerTokenData,
  } = useAuth();

  const classes = useStyles();

  useEffect(() => {
    if (hasPrivateAccess) {
      fetchPremiumChainFeatures(chainId);
    }

    if (!walletLoading) {
      const { unsubscribe } = fetchChain({ chainId, hasPrivateAccess });

      return () => {
        reset();
        unsubscribe();
      };
    }

    return () => {};
  }, [
    chainId,
    hasPrivateAccess,
    fetchChain,
    fetchPremiumChainFeatures,
    reset,
    walletLoading,
    workerTokenData,
  ]);

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classes.root}>
        <Queries<IChainItemDetails>
          isPreloadDisabled
          queryStates={[fetchChainState]}
        >
          {({ data, isLoading, isUninitialized }) => {
            if ((isLoading && isUninitialized) || !data) {
              return <ChainItemSkeleton />;
            }

            return <ChainItem data={data} />;
          }}
        </Queries>
      </div>
    </ThemeProvider>
  );
};
