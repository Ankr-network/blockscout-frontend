import React, { useCallback, useMemo } from 'react';
import { Lock } from '@ankr.com/ui';

import { useCommonChainsItemData } from 'domains/chains/screens/ChainsListPage/hooks/useCommonChainsItemData';
import { Chain, Timeframe } from 'modules/chains/types';
import { CopyEndpointModal } from 'modules/chains/components/CopyEndpointModal';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { isMultichain } from 'modules/chains/utils/isMultichain';

import { usePublicChainsItem } from './hooks/usePublicChainsItem';
import { BaseChainsCard, IBaseChainCardProps } from '../../../BaseChainsCard';
import { usePublicChainsItemStyles } from './usePublicChainsItemStyles';

export interface IChainCardProps {
  chain: Chain;
  timeframe: Timeframe;
  onOpenUpgradeModal: () => void;
}

interface PublucChainCardProps extends IChainCardProps {
  onOpenLoginModal: () => void;
}

const EMPTY_JWT_TOKENS = [
  {
    id: '',
    index: 0,
    userEndpointToken: '',
    jwtData: '',
    name: '',
    description: '',
  },
];

export const PublicChainCard = ({
  chain,
  onOpenLoginModal,
  onOpenUpgradeModal,
  timeframe,
}: PublucChainCardProps) => {
  const { loading = false, totalRequests } = usePublicChainsItem({
    chain,
    timeframe,
  });

  const { totalRequestsStr } = useCommonChainsItemData(chain, totalRequests);

  const { classes } = usePublicChainsItemStyles();

  const hasPublicEndpoints = !chain.premiumOnly;
  const isEndpointLocked = !hasPublicEndpoints || isMultichain(chain.id);

  const onLockedChainClick = useCallback(
    event => {
      event.stopPropagation();
      event.preventDefault();
      if (isMultichain(chain.id)) {
        onOpenLoginModal();
      } else onOpenUpgradeModal();
    },
    [chain.id, onOpenLoginModal, onOpenUpgradeModal],
  );

  const actions = useMemo(() => {
    return (
      <GuardUserGroup blockName={BlockWithPermission.ChainItem}>
        <div className={classes.publicChainActions}>
          <CopyEndpointModal
            jwtTokens={EMPTY_JWT_TOKENS}
            chain={chain}
            userEndpointToken=""
            buttonProps={{
              variant: 'outlined',
              fullWidth: true,
              startIcon: isEndpointLocked && <Lock />,
              onClick: isEndpointLocked ? onLockedChainClick : undefined,
            }}
            isProtocolSwitcherHidden
            buttonClassName={classes.publicChainCopyEndpointButton}
          />
          <AddNetworkButton
            chain={chain}
            size="small"
            hasChainSelector
            className={classes.publicChainAddNetworkButton}
          />
        </div>
      </GuardUserGroup>
    );
  }, [
    chain,
    classes.publicChainActions,
    classes.publicChainAddNetworkButton,
    classes.publicChainCopyEndpointButton,
    isEndpointLocked,
    onLockedChainClick,
  ]);

  const cardProps: IBaseChainCardProps = {
    chain,
    loading,
    timeframe,
    totalRequests: totalRequestsStr,
    actions,
  };

  return <BaseChainsCard {...cardProps} />;
};
