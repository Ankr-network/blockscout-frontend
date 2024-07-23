import { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { Chain } from 'modules/chains/types';
import { PremiumLabel } from 'modules/common/components/GetStartedSection/components/PremiumLabel';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';

import { useBlockchainInfoStyles } from './useBlockchainInfoStyles';

export interface IBlockchainInfoProps {
  badge?: ReactNode;
  chain: Chain;
  isPremiumOnly?: boolean;
}

export const BlockchainInfo = ({
  badge,
  chain,
  isPremiumOnly,
}: IBlockchainInfoProps) => {
  const { coinName, id, name } = chain;

  const icon = useChainIcon(id);

  const { classes } = useBlockchainInfoStyles();

  return (
    <div className={classes.root}>
      <img src={icon} className={classes.icon} alt={id} />
      <div className={classes.info}>
        <Typography
          className={classes.name}
          component="div"
          variant="subtitle1"
        >
          {name}
          {isPremiumOnly && (
            <PremiumLabel
              className={classes.premiumLabel}
              hasGradientBackground
              label="Premium only"
              size="xs"
            />
          )}
        </Typography>
        <Typography className={classes.coin} variant="body3">
          {coinName.toUpperCase()}
        </Typography>
      </div>
      {badge && <div className={classes.badge}>{badge}</div>}
    </div>
  );
};
