import { Box, Typography } from '@mui/material';

import { ChainLogo } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainLogo';
import { Chain } from 'domains/chains/types';

import { ChainItemTypes } from './ChainItemTypes';

interface ChainItemProps {
  chain: Chain;
  chainType?: string;
  groupId?: string;
  isChainTypeHidden?: boolean;
}

export const ChainItem = ({
  chain,
  chainType,
  groupId,
  isChainTypeHidden,
}: ChainItemProps) => {
  const { id, name: chainName, testnets } = chain;

  return (
    <>
      <ChainLogo size={40} chain={chain} />
      <Box ml={2}>
        <Typography variant="subtitle2" component="p">
          {chainName}
        </Typography>
        <ChainItemTypes
          chainType={chainType}
          groupId={groupId}
          id={id}
          isChainTypeHidden={isChainTypeHidden}
          testnets={testnets}
        />
      </Box>
    </>
  );
};
