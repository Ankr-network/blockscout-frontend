import { Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Chain } from '@ankr.com/chains-list';

import { ChainInfo } from '../ChainInfo';
import { useSelectChainCardStyles } from './useSelectedChainCardStyles';

export interface SelectedChainCardProps {
  chain: Chain;
}

export const SelectedChainCard = ({ chain }: SelectedChainCardProps) => {
  const { classes } = useSelectChainCardStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.label} component="p" variant="caption">
        {t('projects.selected-chain-card.label')}
      </Typography>
      <div className={classes.info}>
        <ChainInfo chain={chain} hasCoinName={false} />
      </div>
    </Paper>
  );
};
