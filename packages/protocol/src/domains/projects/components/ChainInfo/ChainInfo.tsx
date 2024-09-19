import { Box, Typography } from '@mui/material';
import React from 'react';
import { Chain } from '@ankr.com/chains-list';

import { ChainLogo } from 'modules/chains/components/ChainLogo';
import { PremiumLabel } from 'modules/common/components/GetStartedSection/components/PremiumLabel';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useChainInfoStyles } from './useChainInfoStyles';

export interface ChainInfoProps {
  chain: Chain;
  hasCoinName?: boolean;
}

export const ChainInfo = ({ chain, hasCoinName = true }: ChainInfoProps) => {
  const { hasPremium } = useAuth();

  const { coinName, name, premiumOnly } = chain;

  const { classes } = useChainInfoStyles();

  return (
    <>
      <ChainLogo size={40} chain={chain} />
      <Box display="flex" flexDirection="column" gap={0.5} ml={3}>
        <Typography
          variant="subtitle2"
          component="p"
          className={classes.chainInfoName}
        >
          {name}

          {premiumOnly && !hasPremium && (
            <PremiumLabel
              size="xs"
              hasGradientBackground
              className={classes.chainInfoPremiumLabel}
            />
          )}
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
