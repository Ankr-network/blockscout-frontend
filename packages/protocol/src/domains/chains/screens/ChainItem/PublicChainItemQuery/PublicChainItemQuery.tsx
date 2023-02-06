import { ChainItemSkeleton } from '../components/ChainItemSkeleton';
import { IChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ChainID } from 'modules/chains/types';
import { useStyles } from '../ChainItemStyles';
import { PublicChainItem } from './components/PublicChainItem';
import { usePublicChainItemQuery } from './PublicChainItemQueryUtils';
import { ChainItemProps } from '../ChainItemTypes';

export const PublicChainItemQuery = ({ chainId, loading }: ChainItemProps) => {
  const { classes } = useStyles();

  const fetchChainState = usePublicChainItemQuery(chainId, loading);

  return (
    <div className={classes.root}>
      <Queries<IChainItemDetails>
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
  );
};
