import { t } from '@ankr.com/common';

import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectBlockchainsLoadingStatus,
  selectNodesDetailsLoadingStatus,
  selectPrivateChainById,
} from 'modules/chains/store/selectors';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

import { ChainItemProps } from '../ChainItemTypes';
import { ChainItemSkeleton } from '../components/ChainItemSkeleton';
import { PrivateChainItem } from './components/PrivateChainItem';
import { useStyles } from '../ChainItemStyles';

export const PrivateChainItemWrapper = ({ chainId }: ChainItemProps) => {
  const isLoadingChains = useAppSelector(selectBlockchainsLoadingStatus);
  const isLoadingNodes = useAppSelector(selectNodesDetailsLoadingStatus);
  const isLoading = isLoadingChains || isLoadingNodes;

  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  const chain = useAppSelector(state =>
    selectPrivateChainById(state, chainId, selectedProjectEndpointToken),
  );

  const { classes } = useStyles();

  if (isLoading) {
    return (
      <div className={classes.root}>
        <ChainItemSkeleton />
      </div>
    );
  }

  if (!chain) {
    throw new Error(t('chain-item.not-found'));
  }

  return (
    <>
      <div className={classes.root}>
        <ExpiredTokenBanner />
        <PrivateChainItem chain={chain} />
      </div>
    </>
  );
};
