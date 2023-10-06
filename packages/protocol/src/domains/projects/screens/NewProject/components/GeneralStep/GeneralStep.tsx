import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { AddProjectForm } from 'domains/projects/screens/NewProject/components/GeneralStep/AddProjectForm';

import { useGeneralStepStyles } from './useGeneralStepStyles';
import { useGeneralStep } from './hooks/useGeneralStep';

export const GeneralStep = () => {
  const { classes } = useGeneralStepStyles();

  useGeneralStep();

  return (
    <div className={classes.root}>
      <Typography variant="body1" component="p" className={classes.title}>
        {t('projects.new-project.step-1.title')}
      </Typography>
      <Typography variant="body2" component="p" className={classes.description}>
        {tHTML('projects.new-project.step-1.description')}
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        className={classes.requireDescription}
      >
        {tHTML('projects.new-project.step-1.require-description')}
      </Typography>
      <AddProjectForm />
    </div>
  );
};
