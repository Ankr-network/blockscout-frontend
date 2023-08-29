import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { useChainStepStyles } from './useChainStepStyles';
import { ChainsTable } from './ChainsTable';
import { useChainStep } from './hooks/useChainStep';
import { HowToGetStartedLink } from '../HowToGetStartedLink';

export const ChainStep = () => {
  const { classes } = useChainStepStyles();

  useChainStep();

  return (
    <div className={classes.chainsRoot}>
      <div className={classes.chainsHeader}>
        <div className={classes.chainTitleWrapper}>
          <Typography className={classes.title} variant="h6">
            {t('projects.new-project.step-1.title')}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            component="p"
          >
            {t('projects.new-project.step-1.description')}
          </Typography>
        </div>
        <HowToGetStartedLink />
      </div>

      <ChainsTable />
    </div>
  );
};
