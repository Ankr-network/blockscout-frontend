import { Box, Typography } from '@mui/material';

import { ChainLogo } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainLogo';
import { Chain } from 'domains/chains/types';

export interface ChainItemProps {
  chain: Chain;
  hasCoinName?: boolean;
}

export const ChainItem = ({ chain, hasCoinName = true }: ChainItemProps) => {
  const { name, coinName } = chain;

  return (
    <>
      <ChainLogo size={40} chain={chain} />
      <Box display="flex" flexDirection="column" gap={0.5} ml={3}>
        <Typography variant="subtitle2" component="p">
          {name}
        </Typography>
        {hasCoinName && coinName && (
          <Typography
            color="textSecondary"
            fontWeight={500}
            lineHeight="135%"
            textTransform="uppercase"
            variant="caption"
          >
            {coinName}
          </Typography>
        )}
      </Box>
    </>
  );
};
