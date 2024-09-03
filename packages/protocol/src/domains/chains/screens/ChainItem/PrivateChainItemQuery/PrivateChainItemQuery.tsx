import { IPrivateChainItemDetails } from 'domains/chains/actions/private/fetchPrivateChain';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';

import { ChainItemSkeleton } from '../components/ChainItemSkeleton';
import { useStyles } from '../ChainItemStyles';
import { PrivateChainItem } from './components/PrivateChainItem';
import { usePrivateChainItemQuery } from './PrivateChainItemQueryUtils';
import { ChainItemProps } from '../ChainItemTypes';

export const PrivateChainItemQuery = ({ chainId }: ChainItemProps) => {
  const fetchChainState = usePrivateChainItemQuery(chainId);

  const {
    isLoading: isLoadingTokenManager,
    jwtTokens,
    shouldShowTokenManager,
  } = useJwtTokenManager();

  const { classes } = useStyles();

  return (
    <>
      <div className={classes.root}>
        <ExpiredTokenBanner />
        <Queries<IPrivateChainItemDetails>
          isPreloadDisabled
          queryStates={[fetchChainState]}
        >
          {({ data, isLoading, isUninitialized }) => {
            if ((isLoading && isUninitialized) || !data) {
              return <ChainItemSkeleton />;
            }

            return (
              <PrivateChainItem
                data={data}
                isLoadingTokenManager={isLoadingTokenManager}
                jwtTokens={jwtTokens}
                shouldShowTokenManager={shouldShowTokenManager}
              />
            );
          }}
        </Queries>
      </div>
    </>
  );
};
