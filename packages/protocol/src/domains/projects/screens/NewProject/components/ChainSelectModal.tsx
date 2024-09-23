import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Chain } from '@ankr.com/chains-list';

import { SelectedChainCard } from 'domains/projects/components/SelectedChainCard';

import { ChainSelect } from './ChainStep/ChainSelect';
import { useChainStepStyles } from './ChainStep/useChainStepStyles';

interface ChainSelectModalProps {
  selectedChain: Chain;
  children: ReactNode;
}

export const ChainSelectModal = ({
  children,
  selectedChain,
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
      <SelectedChainCard chain={selectedChain} />
      <ChainSelect
        className={classes.chainSelectListWrapper}
        chain={selectedChain}
      />
      {children}
    </>
  );
};
