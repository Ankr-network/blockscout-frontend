import { t } from '@ankr.com/common';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectBlockchainsLoadingStatus,
  selectNodesDetailsLoadingStatus,
  selectPublicChainById,
} from 'modules/chains/store/selectors';

import { ChainItemSkeleton } from '../components/ChainItemSkeleton';
import { useStyles } from '../ChainItemStyles';
import { PublicChainItem } from './components/PublicChainItem';
import { ChainItemProps } from '../ChainItemTypes';

export const PublicChainItemWrapper = ({
  chainId,
  loading,
}: ChainItemProps) => {
  const { classes } = useStyles();

  const isLoadingChains = useAppSelector(selectBlockchainsLoadingStatus);
  const isLoadingNodes = useAppSelector(selectNodesDetailsLoadingStatus);
  const isLoading = isLoadingChains || isLoadingNodes;

  const publicChain = useAppSelector(state =>
    selectPublicChainById(state, chainId),
  );

  if (loading || isLoading) {
    return (
      <div className={classes.root}>
        <ChainItemSkeleton />
      </div>
    );
  }

  if (!publicChain) {
    throw new Error(t('chain-item.not-found'));
  }

  return (
    <div className={classes.root}>
      <PublicChainItem
        data={{ chain: publicChain, unfilteredChain: publicChain }}
      />
    </div>
  );
};
