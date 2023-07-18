import { Box, capitalize, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ChainLogo } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainLogo';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';
import { Chain } from 'domains/chains/types';
import { shouldShowGroupId } from './ChainItemUtils';

interface ChainItemProps {
  chain: Chain;
  chainType?: string;
  groupId?: string;
}

export const ChainItem = ({ chain, chainType, groupId }: ChainItemProps) => {
  const { id, name: chainName, testnets } = chain;

  return (
    <>
      <ChainLogo size={40} chain={chain} />
      <Box ml={2}>
        <Typography variant="subtitle2" component="p">
          {chainName}
        </Typography>

        {chainType ? (
          <>
            <Typography mr={1} color="textSecondary" variant="caption">
              {capitalize(chainType)}{' '}
              {groupId &&
                shouldShowGroupId(chainType, groupId) &&
                capitalize(groupId)}
            </Typography>
          </>
        ) : (
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
        )}
      </Box>
    </>
  );
};
