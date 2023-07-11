import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { useChainStepStyles } from './useChainStepStyles';
import { ChainsTable } from './ChainsTable';
import { ProjectName } from './ProjectName';
import { useChainStep } from './hooks/useChainStep';

export const ChainStep = () => {
  const { classes } = useChainStepStyles();

  useChainStep();

  return (
    <div className={classes.chainsRoot}>
      <Typography className={classes.title} variant="h6">
        {t('projects.new-project.step-1.title')}
      </Typography>

      <ProjectName />

      <Typography variant="subtitle2">
        {t('projects.new-project.step-1.chains')}
      </Typography>

      <ChainsTable />
    </div>
  );
};
