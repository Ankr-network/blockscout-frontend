import { IPublicChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ChainID } from 'domains/chains/types';

import { ChainItemSkeleton } from '../components/ChainItemSkeleton';
import { useStyles } from '../ChainItemStyles';
import { PublicChainItem } from './components/PublicChainItem';
import { usePublicChainItemQuery } from './PublicChainItemQueryUtils';
import { ChainItemProps } from '../ChainItemTypes';
import { PremiumOnlyChainGuard } from '../components/PremiumOnlyChainGuard';

export const PublicChainItemQuery = ({ chainId, loading }: ChainItemProps) => {
  const { classes } = useStyles();

  const fetchChainState = usePublicChainItemQuery(chainId, loading);

  return (
    <PremiumOnlyChainGuard chain={fetchChainState.data?.chain}>
      <div className={classes.root}>
        <Queries<IPublicChainItemDetails>
          isPreloadDisabled
          queryStates={[fetchChainState]}
        >
          {({ data, isLoading, isUninitialized }) => {
            if ((isLoading && isUninitialized) || !data) {
              return (
                <ChainItemSkeleton
                  withCodeSample={chainId === ChainID.MULTICHAIN}
                />
              );
            }

            return <PublicChainItem data={data} />;
          }}
        </Queries>
      </div>
    </PremiumOnlyChainGuard>
  );
};
