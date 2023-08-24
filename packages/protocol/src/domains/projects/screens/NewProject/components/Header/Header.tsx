import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { newProjectIntlRoot } from 'domains/projects/const';
import { NewProjectStep } from 'domains/projects/types';

import { useProjectFormValues } from '../../hooks/useProjectFormValues';
import { useHeaderStyles } from './useHeaderStyles';
import { Stepper } from '../Stepper';

interface HeaderProps {
  step: NewProjectStep;
}

export const Header = ({ step }: HeaderProps) => {
  const { classes } = useHeaderStyles();

  const { projectName } = useProjectFormValues();

  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.title} variant="h5">
          {t(`${newProjectIntlRoot}.title`, { projectName })}
        </Typography>
        <Stepper step={step} />
      </div>
    </div>
  );
};
