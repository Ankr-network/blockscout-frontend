import { Box, Typography } from '@mui/material';

import { Chain } from 'modules/chains/types';
import { ChainLogo } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/ChainLogo';

export interface ChainInfoProps {
  chain: Chain;
  hasCoinName?: boolean;
}

export const ChainInfo = ({ chain, hasCoinName = true }: ChainInfoProps) => {
  const { coinName, name } = chain;

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
