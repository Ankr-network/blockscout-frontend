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
      <Typography
        className={classes.chainModalDescription}
        component="p"
        variant="caption"
      >
        {t('projects.new-project.chain-modal.description')}
      </Typography>
      <Paper className={classes.chainItemWrapper}>
        <Typography
          className={classes.selectedChainLabel}
          component="p"
          variant="caption"
        >
          {t('projects.new-project.chain-modal.selected-chain-label')}
        </Typography>
        <div className={classes.chainItem}>
          <ChainItem chain={selectedChain} hasCoinName={false} />
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
