import { capitalize, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';
import { Chain, ChainID } from 'domains/chains/types';

import { shouldShowGroupId } from './ChainItemUtils';

interface ChainItemTypeProps {
  chainType?: string;
  groupId?: string;
  id: ChainID;
  isChainTypeHidden?: boolean;
  testnets?: Chain[];
}

export const ChainItemTypes = ({
  chainType,
  groupId,
  id,
  isChainTypeHidden,
  testnets,
}: ChainItemTypeProps) => {
  if (isChainTypeHidden) {
    return null;
  }

  if (chainType) {
    return (
      <>
        <Typography mr={1} color="textSecondary" variant="caption">
          {capitalize(chainType)}{' '}
          {groupId &&
            shouldShowGroupId(chainType, groupId) &&
            capitalize(groupId)}
        </Typography>
      </>
    );
  }

  return (
    <>
      {!isTestnetOnlyChain(id) && (
        <Typography mr={1} color="textSecondary" variant="caption">
          {t('projects.new-project.chain.mainnet')}
        </Typography>
      )}
      {testnets && (
        <Typography mr={1} color="textSecondary" variant="caption">
          {t('projects.new-project.chain.testnet')}
        </Typography>
      )}
    </>
  );
};
