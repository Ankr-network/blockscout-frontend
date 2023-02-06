import { ChainItemSkeleton } from '../components/ChainItemSkeleton/ChainItemSkeleton';
import { IChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useStyles } from '../ChainItemStyles';
import { PrivateChainItem } from './components/PrivateChainItem';
import { usePrivateChainItemQuery } from './PrivateChainItemQueryUtils';
import { ChainItemProps } from '../ChainItemTypes';

export const PrivateChainItemQuery = ({ chainId, loading }: ChainItemProps) => {
  const { classes } = useStyles();
  const fetchChainState = usePrivateChainItemQuery(chainId, loading);

  return (
    <div className={classes.root}>
      <Queries<IChainItemDetails>
        isPreloadDisabled
        queryStates={[fetchChainState]}
      >
        {({ data, isLoading, isUninitialized }) => {
          if ((isLoading && isUninitialized) || !data) {
            return <ChainItemSkeleton />;
          }

          return <PrivateChainItem data={data} />;
        }}
      </Queries>
    </div>
  );
};
