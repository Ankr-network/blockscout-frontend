import { ReactNode } from 'react';
import { Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Chain } from 'domains/chains/types';

import { ChainItem } from './ChainItem';
import { ChainSelect } from './ChainStep/ChainSelect';
import { useChainStepStyles } from './ChainStep/useChainStepStyles';

interface ChainSelectModalProps {
  selectedChain: Chain;
  children: ReactNode;
}

export const ChainSelectModal = ({
  selectedChain,
  children,
}: ChainSelectModalProps) => {
  const { classes } = useChainStepStyles();

  return (
    <>
      <Paper className={classes.chainItemWrapper}>
        <Typography
          variant="caption"
          color="textSecondary"
          mb={1}
          component="p"
        >
          {t('projects.new-project.chain-modal.selected-chain-label')}
        </Typography>
        <div className={classes.chainItem}>
          <ChainItem chain={selectedChain} isChainTypeHidden />
        </div>
      </Paper>
      <ChainSelect
        className={classes.chainSelectListWrapper}
        chain={selectedChain}
      />
      {children}
    </>
  );
};
