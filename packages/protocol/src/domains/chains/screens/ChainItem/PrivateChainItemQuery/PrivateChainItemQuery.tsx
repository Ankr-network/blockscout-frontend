import { IPrivateChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { Queries } from 'modules/common/components/Queries/Queries';
import { JwtTokenManager } from 'domains/jwtToken/components/JwtTokenManager';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';

import { ChainItemSkeleton } from '../components/ChainItemSkeleton';
import { useStyles } from '../ChainItemStyles';
import { PrivateChainItem } from './components/PrivateChainItem';
import { usePrivateChainItemQuery } from './PrivateChainItemQueryUtils';
import { ChainItemProps } from '../ChainItemTypes';

export const PrivateChainItemQuery = ({ chainId }: ChainItemProps) => {
  const { classes } = useStyles();
  const fetchChainState = usePrivateChainItemQuery(chainId);

  return (
    <div className={classes.root}>
      <ExpiredTokenBanner />
      <JwtTokenManager />
      <Queries<IPrivateChainItemDetails>
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
