import { ChainItemSkeleton } from '../components/ChainItemSkeleton';
import { IChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ChainID } from 'modules/chains/types';
import { useStyles } from '../ChainItemStyles';
import { PrivateChainItem } from './components/PrivateChainItem';
import { usePrivateChainItemQuery } from './PrivateChainItemQueryUtils';
import { ChainItemProps } from '../ChainItemTypes';
import { JwtTokenManager } from 'domains/jwtToken/components/JwtTokenManager';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';

export const PrivateChainItemQuery = ({ chainId }: ChainItemProps) => {
  const { classes } = useStyles();
  const fetchChainState = usePrivateChainItemQuery(chainId);

  return (
    <div className={classes.root}>
      <ExpiredTokenBanner />
      <JwtTokenManager />
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

          return <PrivateChainItem data={data} />;
        }}
      </Queries>
    </div>
  );
};
