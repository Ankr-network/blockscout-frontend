import { ReactNode } from 'react';
import { Tooltip, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Chain, ChainID } from 'modules/chains/types';
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

  const isBitcoin = chain.id === ChainID.BTC;

  const icon = useChainIcon(id);

  const { classes, cx } = useBlockchainInfoStyles();

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
        <div className={classes.subinfo}>
          <Typography
            className={cx(classes.coin, isBitcoin && classes.separator)}
            variant="body3"
          >
            {coinName.toUpperCase()}
          </Typography>
          {isBitcoin && (
            <Tooltip
              placement="top"
              title={t('chains.links.blockbook-description')}
            >
              <Typography variant="body3" className={classes.blockbook}>
                {t('chains.links.blockbook')}
              </Typography>
            </Tooltip>
          )}
        </div>
      </div>
      {badge && <div className={classes.badge}>{badge}</div>}
    </div>
  );
};
